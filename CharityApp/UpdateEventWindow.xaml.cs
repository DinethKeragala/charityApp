using System;
using System.Windows;
using MySql.Data.MySqlClient;
using static CharityApp.MainWindow;

namespace CharityApp
{
    public partial class UpdateEventWindow : Window
    {
        private string connectionString = "server=localhost;database=donation_db;user=root;password=1234;";
        private int eventId; 

        public UpdateEventWindow(Event selectedEvent)
        {
            InitializeComponent();

            
            eventId = selectedEvent.Id;

            
            NameTextBox.Text = selectedEvent.Name;
            DescriptionTextBox.Text = selectedEvent.Description;
            ImagePathTextBox.Text = selectedEvent.ImagePath;
        }

        private void UpdateEvent_Click(object sender, RoutedEventArgs e)
        {
            
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
                this.Close(); 
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error updating event: " + ex.Message);
            }
        }
    }
}