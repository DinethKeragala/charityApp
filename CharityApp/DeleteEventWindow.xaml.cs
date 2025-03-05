using System;
using System.Windows;
using MySql.Data.MySqlClient;
using static CharityApp.MainWindow;

namespace CharityApp
{
    public partial class DeleteEventWindow : Window
    {
        private string connectionString = "server=localhost;database=donation_db;user=root;password=1234;";
        private int eventId; // Store the ID of the event being deleted

        public DeleteEventWindow(Event selectedEvent)
        {
            InitializeComponent(); // Ensure this line is present

            // Store the selected event's ID for deletion
            eventId = selectedEvent.Id;

            // Display the event name in the confirmation message
            EventNameText.Text = selectedEvent.Name;
        }

        // Delete Event from MySQL
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
                this.Close(); // Close the delete confirmation window
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error deleting event: " + ex.Message);
            }
        }

        // Cancel the deletion
        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            this.Close(); // Close window without deleting
        }
    }
}