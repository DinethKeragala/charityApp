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
           
            if (UsernameTextBox.Text == "admin" && PasswordBox.Password == "admin123")
            {              
                MainWindow adminDashboard = new MainWindow();
                adminDashboard.Show();
         
                this.Close();
            }
            else
            {
                
                ErrorMessage.Text = "Invalid email or password!";
                ErrorMessage.Visibility = Visibility.Visible;
            }
        }
    }
}
