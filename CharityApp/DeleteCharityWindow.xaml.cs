using System.Windows;
using MySql.Data.MySqlClient;
using static CharityApp.MainWindow;

namespace CharityApp
{
    public partial class DeleteCharityWindow : Window
    {
        private string connectionString = "server=localhost;database=donation_db;user=root;password=1234;";
        private int charityId; // Store the ID of the charity being deleted

        public DeleteCharityWindow(Charity selectedCharity)
        {
            InitializeComponent();

            // Store the selected charity's ID for deletion
            charityId = selectedCharity.Id;

            // Display the charity name in the confirmation message
            CharityNameText.Text = selectedCharity.Name;
        }

        // Delete Charity from MySQL
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
                this.Close(); // Close the delete confirmation window
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error deleting charity: " + ex.Message);
            }
        }

        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            this.Close(); // Close window without deleting
        }
    }
}
