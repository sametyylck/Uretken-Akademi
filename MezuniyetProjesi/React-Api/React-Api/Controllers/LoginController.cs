using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React_Api.DTo;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace React_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public readonly IDbConnection _db;

        public LoginController(IDbConnection db)
        {
            _db = db;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Register>> Register(Register T)
        {


            DynamicParameters prm = new DynamicParameters();
            prm.Add("@kullanici_adi", T.kullanici_adi);
            prm.Add("@sifre", T.sifre);
            prm.Add("@Ad", T.Ad);
            prm.Add("@Soyad", T.Soyad);
            prm.Add("@Telefon", T.Telefon);
            prm.Add("@Role_id", T.Role_id);

            var sql = @"Insert into Users (Role_id,kullanici_adi,sifre,Ad,Soyad,Telefon) OUTPUT INSERTED.[Id] 
            values  (@Role_id,@kullanici_adi,@sifre,@Ad,@Soyad,@Telefon)";
            int userid = await _db.QuerySingleAsync<int>(sql, prm);

            return Ok("Kayıt Başarılı");
        }
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(Login A)
        {

            DynamicParameters prm = new DynamicParameters();
            prm.Add("@Passowrd", A.sifre);
            prm.Add("@Mail", A.kullanici_adi);

            string sql = $@"Select u.Id,u.Ad,u.Soyad from Users u 
                where kullanici_adi=@Mail and sifre=@Passowrd";
            var list = await _db.QueryAsync<LoginUsers>(sql, prm);
            if (list.Count() <= 0)
            {
                return BadRequest("Giriş bilgileriniz kontrol ediniz.");

            }

            string? firstname = list.First().Ad;
            string? LastName = list.First().Soyad;
            int? Id = list.First().Id;


            return Ok(new { firstname, LastName, Id });




        }



    }


}

