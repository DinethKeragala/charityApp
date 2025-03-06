using System;
using System.Windows;
using MySql.Data.MySqlClient;
using static CharityApp.MainWindow;

namespace CharityApp
{
    public partial class UpdateCharityWindow : Window
    {
        private string connectionString = "server=localhost;database=donation_db;user=root;password=1234;";
        private int charityId; 

        public UpdateCharityWindow(Charity selectedCharity)
        {
            InitializeComponent();

           
            charityId = selectedCharity.Id;

            
            NameTextBox.Text = selectedCharity.Name;
            DescriptionTextBox.Text = selectedCharity.Description;
            ImagePathTextBox.Text = selectedCharity.ImagePath; 
        }

        
        private void UpdateCharity_Click(object sender, RoutedEventArgs e)
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
                    string query = "UPDATE charities SET name = @name, description = @description, image = @image WHERE id = @id";
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@name", NameTextBox.Text);
                    cmd.Parameters.AddWithValue("@description", DescriptionTextBox.Text);
                    cmd.Parameters.AddWithValue("@image", ImagePathTextBox.Text); 
                    cmd.Parameters.AddWithValue("@id", charityId);
                    cmd.ExecuteNonQuery();
                }

                MessageBox.Show("Charity updated successfully!");
                this.Close(); 
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error updating charity: " + ex.Message);
            }
        }
    }
}