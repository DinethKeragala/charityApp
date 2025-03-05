using System;
using System.Windows;
using MySql.Data.MySqlClient;
using static CharityApp.MainWindow;

namespace CharityApp
{
    public partial class UpdateEventWindow : Window
    {
        private string connectionString = "server=localhost;database=donation_db;user=root;password=1234;";
        private int eventId; // Store the ID of the event being updated

        public UpdateEventWindow(Event selectedEvent)
        {
            InitializeComponent(); // Ensure this line is present

            // Store the selected event's ID for updating
            eventId = selectedEvent.Id;

            // Pre-fill fields with existing event data
            NameTextBox.Text = selectedEvent.Name;
            DescriptionTextBox.Text = selectedEvent.Description;
            ImagePathTextBox.Text = selectedEvent.ImagePath;
        }

        private void UpdateEvent_Click(object sender, RoutedEventArgs e)
        {
            // Validate input fields
            if (string.IsNullOrWhiteSpace(NameTextBox.Text) ||
                string.IsNullOrWhiteSpace(DescriptionTextBox.Text) ||
                string.IsNullOrWhiteSpace(ImagePathTextBox.Text))
            {
                MessageBox.Show("Please fill in all fields.");
                return;
            }

            try
            {
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    conn.Open();
                    string query = "UPDATE events SET name = @name, description = @description, image = @image WHERE id = @id";
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@name", NameTextBox.Text);
                    cmd.Parameters.AddWithValue("@description", DescriptionTextBox.Text);
                    cmd.Parameters.AddWithValue("@image", ImagePathTextBox.Text);
                    cmd.Parameters.AddWithValue("@id", eventId);
                    cmd.ExecuteNonQuery();
                }

                MessageBox.Show("Event updated successfully!");
                this.Close(); // Close the update form after updating
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error updating event: " + ex.Message);
            }
        }
    }
}