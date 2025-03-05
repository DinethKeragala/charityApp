using MySql.Data.MySqlClient;

public class DatabaseHelper
{
    private static string connectionString = "server=localhost; database=donation_db; uid=root; pwd=1234;";

    public static MySqlConnection GetConnection()
    {
        return new MySqlConnection(connectionString);
    }
}
