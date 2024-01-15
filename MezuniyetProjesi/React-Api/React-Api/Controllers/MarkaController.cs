using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React_Api.DTo;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace React_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarkaController : ControllerBase
    {
        public readonly IDbConnection _connection;

        public MarkaController(IDbConnection connection)
        {
            _connection = connection;
        }

        [Route("List")]
        [HttpGet]
        public async Task<ActionResult<MDKList>> List()
        {
            string sql = $"Select Id,Ad From Marka";
            var eklenen = await _connection.QueryAsync<MDKList>(sql);
            return Ok(eklenen);
        }
        [Route("Insert")]
        [HttpPost]
        public async Task<ActionResult<MDKList>> Insert(MDK T)
        {


            DynamicParameters prm = new DynamicParameters();
            prm.Add("@Name", T.Ad);
            int id= await _connection.QuerySingleAsync<int>($"Insert into Marka (Ad) OUTPUT INSERTED.[Id] values (@Name)", prm);
            string sql = $"Select Id,Ad From Marka where Id = {id}";
            var eklenen = await _connection.QueryAsync<MDKList>(sql);
            return Ok(eklenen.First());




        }

        [Route("Update")]
        [HttpPut]
        public async Task<ActionResult<MDKList>> Update(MDKList T)
        {

            DynamicParameters prm = new DynamicParameters();
            prm.Add("@id", T.Id);
            prm.Add("@Name", T.Ad);
            await _connection.ExecuteAsync($"Update Marka SET Ad = @Name where Id = @id", prm);
            return Ok("Başarılı");


        }
        [Route("Delete")]
        [HttpDelete]
        public async Task<ActionResult<MDKList>> Delete(int id)
        {
            DynamicParameters prm = new DynamicParameters();
            prm.Add("@id", id);
            //Burda Silinen Measure ye ait Item ların MeasureId lerini Null Yapıyoruz
            bool? var = await _connection.QueryFirstOrDefaultAsync<bool>($"select marka_id from Stok where marka_id=@id", prm);

            if (var == true)
            {
                return BadRequest("Bu marka bir stokda mevcut!");
            }
            //Burda Normal Measure Kaydını Siliyoruz
            await _connection.ExecuteAsync($"Delete From Marka where Id = @id", prm);
            return Ok("Başarılı");
        }


    }


}


