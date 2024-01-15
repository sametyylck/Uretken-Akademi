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
    public class StokController : ControllerBase
    {
        public readonly IDbConnection _connection;

        public StokController(IDbConnection connection)
        {
            _connection = connection;
        }

        [Route("List")]
        [HttpGet]
        public async Task<ActionResult<Stok>> List()
        {
            string sql = $"Select Stok.Id,Ad,ozellik,fiyat,dp_id,kategori_id,marka_id,miktar From Stok\r\ninner join StokCount on stok_id=Stok.Id ";
            var eklenen = await _connection.QueryAsync<Stok>(sql);
            return Ok(eklenen);
        }
        [Route("Insert")]
        [HttpPost]
        public async Task<ActionResult<Stok>> Insert(StokInsert T)
        {


            DynamicParameters prm = new DynamicParameters();
            prm.Add("@Ad", T.Ad);
            prm.Add("@ozellik", T.ozellik);
            prm.Add("@dp_id", T.dp_id);
            prm.Add("@kategori_id", T.kategori_id);
            prm.Add("@marka_id", T.marka_id);
            prm.Add("@fiyat", T.fiyat);
            prm.Add("@miktar", 0);

            int id = await _connection.QuerySingleAsync<int>($"Insert into Stok (Ad,ozellik,dp_id,kategori_id,marka_id,fiyat) OUTPUT INSERTED.[Id] " +
                $"values (@Ad,@ozellik,@dp_id,@kategori_id,@marka_id,@fiyat)", prm);
            prm.Add("@id", id);
            await _connection.QuerySingleAsync<int>($"Insert into StokCount (stok_id,miktar) OUTPUT INSERTED.[Id] values (@id,@miktar)", prm);
            string sql = $"Select Id,Ad,dp_id,kategori_id,marka_id,fiyat,ozellik From Stok where Id = {id}";
            var eklenen = await _connection.QueryAsync<Stok>(sql);
            return Ok(eklenen.First());




        }

        [Route("Update")]
        [HttpPut]
        public async Task<ActionResult<Stok>> Update(Stok T)
        {

            DynamicParameters prm = new DynamicParameters();
            prm.Add("@id", T.Id);
            prm.Add("@Ad", T.Ad);
            prm.Add("@ozellik", T.ozellik);
            prm.Add("@dp_id", T.dp_id);
            prm.Add("@kategori_id", T.kategori_id);
            prm.Add("@marka_id", T.marka_id);
            prm.Add("@fiyat", T.fiyat);
            await _connection.ExecuteAsync($"Update Stok SET Ad = @ad,ozellik=@ozellik,dp_id=@dp_id,marka_id=@marka_id,kategori_id=@kategori_id,fiyat=@fiyat where Id = @id", prm);
            string sql = $"Select Id,Ad,ozellik,fiyat,dp_id,kategori_id,marka_id From Stok";
            var eklenen = await _connection.QueryAsync<Stok>(sql);
            return Ok(eklenen);


        }
        [Route("Delete")]
        [HttpDelete]
        public async Task<ActionResult<Stok>> Delete(int id)
        {
            DynamicParameters prm = new DynamicParameters();
            prm.Add("@id", id);
         
            await _connection.ExecuteAsync($"Delete From Stok where Id = @id", prm);
            return Ok("Başarılı");
        }
        [Route("Arama")]
        [HttpPost]
        public async Task<ActionResult<Stok>> Arama([FromBody]StokArama T)
        {
            DynamicParameters prm = new DynamicParameters();
            prm.Add("@kelime", T.kelime);
            prm.Add("@marka_id", T.marka_id);
            prm.Add("@kategori_id", T.kategori_id);
            prm.Add("@dp_id", T.dp_id);
            prm.Add("@kelime", T.kelime);
            if (T.kelime == null && T.dp_id==null && T.kategori_id==null && T.marka_id==null)
            {
                var liste = await _connection.QueryAsync<Stok>($"Select Id,Ad,ozellik,fiyat,dp_id,kategori_id,marka_id From Stok");
                return Ok(liste);
            }
            var sql = $"select * from Stok where marka_id=@marka_id or dp_id=@dp_id or kategori_id=@kategori_id or Ad Like '%{T.kelime}%'";
           var list= await _connection.QueryAsync<Stok>(sql, prm);
            return Ok(list);
        }


    }


}


