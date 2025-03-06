using System;
using System.Windows;
using MySql.Data.MySqlClient;
using static CharityApp.MainWindow;

namespace CharityApp
{
    public partial class DeleteEventWindow : Window
    {
        private string connectionString = "server=localhost;database=donation_db;user=root;password=1234;";
        private int eventId; 

        public DeleteEventWindow(Event selectedEvent)
        {
            InitializeComponent(); 

            
            eventId = selectedEvent.Id;

            
            EventNameText.Text = selectedEvent.Name;
        }

        
        private void DeleteEvent_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    conn.Open();
                    string query = "DELETE FROM events WHERE id = @id";
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@id", eventId);
                    cmd.ExecuteNonQuery();
                }

                MessageBox.Show("Event deleted successfully!");
                this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error deleting event: " + ex.Message);
            }
        }

        
        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            this.Close(); 
        }
    }
}