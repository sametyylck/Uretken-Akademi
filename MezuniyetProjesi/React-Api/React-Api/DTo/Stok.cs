namespace React_Api.DTo
{
    public class Stok
    {
        public int Id { get; set; } 
        public string Ad {  get; set; }
        public string? ozellik { get; set; }
        public string? fiyat { get; set; }
        public int dp_id { get; set; }
        public int marka_id { get; set; }
        public int kategori_id { get; set; }
        public int miktar {  get; set; }    

    }
    public class StokInsert
    {
        public string Ad { get; set; }
        public string ozellik { get; set; }
        public string fiyat { get; set; }
        public int dp_id { get; set; }
        public int marka_id { get; set; }
        public int kategori_id { get; set; }

    }
    public class StokArama
    {
        public string? kelime { get; set; }
        public int? dp_id { get; set; }
        public int? marka_id { get; set; }
        public int? kategori_id { get; set; }

    }
    public class Delete
    {
        public int id { get; set; }
    }
}
