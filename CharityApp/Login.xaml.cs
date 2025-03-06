using System.Windows;

namespace CharityApp
{
    public partial class Login : Window
    {
        public Login()
        {
            InitializeComponent();
        }

        private void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            // Validate user credentials (you can add actual authentication logic here)
            if (UsernameTextBox.Text == "admin" && PasswordBox.Password == "admin123")
            {
                // Navigate to Admin Dashboard
                MainWindow adminDashboard = new MainWindow();
                adminDashboard.Show();

                // Close Login Window
                this.Close();
            }
            else
            {
                // Show error message
                ErrorMessage.Text = "Invalid email or password!";
                ErrorMessage.Visibility = Visibility.Visible;
            }
        }
    }
}
