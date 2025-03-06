﻿using System;
using System.Windows;
using MySql.Data.MySqlClient;

namespace CharityApp
{
    public partial class AddEventWindow : Window
    {
        private string connectionString = "server=localhost;database=donation_db;user=root;password=1234;";

        public AddEventWindow()
        {
            InitializeComponent(); 
        }

        private void AddEvent_Click(object sender, RoutedEventArgs e)
        {
            
            if (string.IsNullOrWhiteSpace(NameTextBox.Text) ||
                string.IsNullOrWhiteSpace(DescriptionTextBox.Text) ||
                string.IsNullOrWhiteSpace(ImageTextBox.Text))
            {
                MessageBox.Show("Please fill in all fields.");
                return;
            }

            try
            {
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    conn.Open();
                    string query = "INSERT INTO events (name, description, image) VALUES (@name, @description, @image)";
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@name", NameTextBox.Text);
                    cmd.Parameters.AddWithValue("@description", DescriptionTextBox.Text);
                    cmd.Parameters.AddWithValue("@image", ImageTextBox.Text);
                    cmd.ExecuteNonQuery();
                }

                MessageBox.Show("Event added successfully!");
                this.Close(); 
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error adding event: " + ex.Message);
            }
        }
    }
}