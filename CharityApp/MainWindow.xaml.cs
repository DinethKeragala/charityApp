using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Media.Imaging; // For BitmapImage
using MySql.Data.MySqlClient;

namespace CharityApp
{
    public partial class MainWindow : Window
    {
        private string connectionString = "server=localhost;database=donation_db;user=root;password=1234;";
        private int selectedCharityId = -1; // Track the selected charity ID
        private int selectedEventId = -1;   // Track the selected event ID

        public MainWindow()
        {
            InitializeComponent();
            SetUIVisibility(false, false, false, false, false, true); // Hide all UI elements except dashboard on startup
            LoadDashboardStatistics(); // Load dashboard statistics when the window loads
        }

        // Event Handler for HealTheWorld Button
        private void HealTheWorldButton_Click(object sender, RoutedEventArgs e)
        {
            SetUIVisibility(false, false, false, false, false, true); // Show dashboard, hide others
            LoadDashboardStatistics(); // Reload dashboard statistics
        }

        // Event Handler for Log Out Button
        private void LogOutButton_Click(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown(); // Exit the application
        }

        // Define User Model
        public class User
        {
            public string FullName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
        }

        // Define Charity Model
        public class Charity
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string ImagePath { get; set; } // Store the image path as a string
            public BitmapImage Image { get; set; } // Store the image as BitmapImage for display
        }

        // Define Event Model
        public class Event
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string ImagePath { get; set; } // Store the image path as a string
            public BitmapImage Image { get; set; } // Store the image as BitmapImage for display
        }

        // Load Dashboard Statistics
        private void LoadDashboardStatistics()
        {
            try
            {
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    conn.Open();

                    // Fetch number of users
                    string userQuery = "SELECT COUNT(*) FROM users";
                    MySqlCommand userCmd = new MySqlCommand(userQuery, conn);
                    int userCount = Convert.ToInt32(userCmd.ExecuteScalar());
                    UserCountText.Text = userCount.ToString();

                    // Fetch total donations by summing up all amounts in the donations table
                    string donationQuery = "SELECT SUM(amount) FROM donations";
                    MySqlCommand donationCmd = new MySqlCommand(donationQuery, conn);
                    object donationResult = donationCmd.ExecuteScalar();
                    decimal totalDonations = donationResult != DBNull.Value ? Convert.ToDecimal(donationResult) : 0;
                    DonationCountText.Text = totalDonations.ToString("C"); // Format as currency

                    // Fetch number of charities
                    string charityQuery = "SELECT COUNT(*) FROM charities";
                    MySqlCommand charityCmd = new MySqlCommand(charityQuery, conn);
                    int charityCount = Convert.ToInt32(charityCmd.ExecuteScalar());
                    CharityCountText.Text = charityCount.ToString();

                    // Fetch number of events
                    string eventQuery = "SELECT COUNT(*) FROM events";
                    MySqlCommand eventCmd = new MySqlCommand(eventQuery, conn);
                    int eventCount = Convert.ToInt32(eventCmd.ExecuteScalar());
                    EventCountText.Text = eventCount.ToString();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error loading dashboard statistics: " + ex.Message);
            }
        }

        // Fetch and Display Users
        private void UsersButton_Click(object sender, RoutedEventArgs e)
        {
            SetUIVisibility(true, false, false, false, false, false); // Show users, hide others, hide dashboard
            LoadUsers();
        }

        private void LoadUsers()
        {
            List<User> users = new List<User>();

            try
            {
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    conn.Open();
                    string query = "SELECT full_name, username, email FROM users";
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    MySqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        users.Add(new User
                        {
                            FullName = reader["full_name"].ToString(),
                            Username = reader["username"].ToString(),
                            Email = reader["email"].ToString()
                        });
                    }
                    reader.Close();
                }

                UsersDataGrid.ItemsSource = users;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Database Error: " + ex.Message);
            }
        }

        // Fetch and Display Charities
        private void CharitiesButton_Click(object sender, RoutedEventArgs e)
        {
            SetUIVisibility(false, true, true, false, false, false); // Show charities and CRUD buttons, hide others, hide dashboard
            LoadCharities();
        }

        private void LoadCharities()
        {
            List<Charity> charities = new List<Charity>();

            try
            {
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    conn.Open();
                    string query = "SELECT id, name, description, image FROM charities";
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    MySqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        var charity = new Charity
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Name = reader["name"].ToString(),
                            Description = reader["description"].ToString(),
                            ImagePath = reader["image"].ToString() // Store the image path
                        };

                        // Load the image as BitmapImage
                        if (!string.IsNullOrEmpty(charity.ImagePath))
                        {
                            try
                            {
                                charity.Image = new BitmapImage(new Uri(charity.ImagePath, UriKind.RelativeOrAbsolute));
                            }
                            catch (Exception ex)
                            {
                                MessageBox.Show("Error loading image: " + ex.Message);
                            }
                        }

                        charities.Add(charity);
                    }
                    reader.Close();
                }

                CharitiesListView.ItemsSource = charities;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Database Error: " + ex.Message);
            }
        }

        // Fetch and Display Events
        private void EventsButton_Click(object sender, RoutedEventArgs e)
        {
            SetUIVisibility(false, false, false, true, true, false); // Show events and CRUD buttons, hide others, hide dashboard
            LoadEvents();
        }

        private void LoadEvents()
        {
            List<Event> events = new List<Event>();

            try
            {
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    conn.Open();
                    string query = "SELECT id, name, description, image FROM events";
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    MySqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        var eventItem = new Event
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Name = reader["name"].ToString(),
                            Description = reader["description"].ToString(),
                            ImagePath = reader["image"].ToString() // Store the image path
                        };

                        // Load the image as BitmapImage
                        if (!string.IsNullOrEmpty(eventItem.ImagePath))
                        {
                            try
                            {
                                eventItem.Image = new BitmapImage(new Uri(eventItem.ImagePath, UriKind.RelativeOrAbsolute));
                            }
                            catch (Exception ex)
                            {
                                MessageBox.Show("Error loading image: " + ex.Message);
                            }
                        }

                        events.Add(eventItem);
                    }
                    reader.Close();
                }

                EventsListView.ItemsSource = events;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Database Error: " + ex.Message);
            }
        }

        // Open Add Charity Form
        private void OpenAddCharityForm(object sender, RoutedEventArgs e)
        {
            AddCharityWindow addWindow = new AddCharityWindow();
            addWindow.ShowDialog();
            LoadCharities(); // Refresh the charities list
        }

        // Open Update Charity Form
        private void OpenUpdateCharityForm(object sender, RoutedEventArgs e)
        {
            if (CharitiesListView.SelectedItem is Charity selectedCharity)
            {
                UpdateCharityWindow updateWindow = new UpdateCharityWindow(selectedCharity);
                if (updateWindow.ShowDialog() == true)
                {
                    LoadCharities(); // Refresh data after closing form
                }
            }
            else
            {
                MessageBox.Show("Please select a charity to update.");
            }
        }

        // Open Delete Charity Form
        private void OpenDeleteCharityForm(object sender, RoutedEventArgs e)
        {
            if (CharitiesListView.SelectedItem is Charity selectedCharity)
            {
                DeleteCharityWindow deleteWindow = new DeleteCharityWindow(selectedCharity);
                if (deleteWindow.ShowDialog() == true)
                {
                    LoadCharities(); // Refresh data after closing form
                }
            }
            else
            {
                MessageBox.Show("Please select a charity to delete.");
            }
        }

        // Open Add Event Form
        private void OpenAddEventForm(object sender, RoutedEventArgs e)
        {
            AddEventWindow addWindow = new AddEventWindow();
            addWindow.ShowDialog();
            LoadEvents(); // Refresh the events list
        }

        // Open Update Event Form
        private void OpenUpdateEventForm(object sender, RoutedEventArgs e)
        {
            if (EventsListView.SelectedItem is Event selectedEvent)
            {
                UpdateEventWindow updateWindow = new UpdateEventWindow(selectedEvent);
                if (updateWindow.ShowDialog() == true)
                {
                    LoadEvents(); // Refresh data after closing form
                }
            }
            else
            {
                MessageBox.Show("Please select an event to update.");
            }
        }

        // Open Delete Event Form
        private void OpenDeleteEventForm(object sender, RoutedEventArgs e)
        {
            if (EventsListView.SelectedItem is Event selectedEvent)
            {
                DeleteEventWindow deleteWindow = new DeleteEventWindow(selectedEvent);
                if (deleteWindow.ShowDialog() == true)
                {
                    LoadEvents(); // Refresh data after closing form
                }
            }
            else
            {
                MessageBox.Show("Please select an event to delete.");
            }
        }

        // Select Charity from ListView
        private void CharitiesListView_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            if (CharitiesListView.SelectedItem is Charity selectedCharity)
            {
                selectedCharityId = selectedCharity.Id;
            }
            else
            {
                selectedCharityId = -1; // Reset to default value
            }
        }

        // Select Event from ListView
        private void EventsListView_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            if (EventsListView.SelectedItem is Event selectedEvent)
            {
                selectedEventId = selectedEvent.Id;
            }
            else
            {
                selectedEventId = -1; // Reset to default value
            }
        }

        // Helper method to manage UI visibility
        private void SetUIVisibility(bool showUsers, bool showCharities, bool showCrudButtons, bool showEvents, bool showEventsCrudButtons, bool showDashboard = false)
        {
            UsersDataGrid.Visibility = showUsers ? Visibility.Visible : Visibility.Collapsed;
            CharitiesListView.Visibility = showCharities ? Visibility.Visible : Visibility.Collapsed;
            CrudButtonPanel.Visibility = showCrudButtons ? Visibility.Visible : Visibility.Collapsed;
            EventsListView.Visibility = showEvents ? Visibility.Visible : Visibility.Collapsed;
            EventsCrudButtonPanel.Visibility = showEventsCrudButtons ? Visibility.Visible : Visibility.Collapsed;

            // Control visibility of the dashboard statistics
            DashboardStatisticsPanel.Visibility = showDashboard ? Visibility.Visible : Visibility.Collapsed;
        }
    }
}