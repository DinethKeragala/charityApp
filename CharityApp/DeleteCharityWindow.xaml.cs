using System.Windows;
using MySql.Data.MySqlClient;
using static CharityApp.MainWindow;

namespace CharityApp
{
    public partial class DeleteCharityWindow : Window
    {
        private string connectionString = "server=localhost;database=donation_db;user=root;password=1234;";
        private int charityId; 

        public DeleteCharityWindow(Charity selectedCharity)
        {
            InitializeComponent();

            
            charityId = selectedCharity.Id;

            
            CharityNameText.Text = selectedCharity.Name;
        }

       
        private void DeleteCharity_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    conn.Open();
                    string query = "DELETE FROM charities WHERE id = @id";
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@id", charityId);
                    cmd.ExecuteNonQuery();
                }

                MessageBox.Show("Charity deleted successfully!");
                this.Close(); 
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error deleting charity: " + ex.Message);
            }
        }

        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            this.Close(); 
        }
    }
}
