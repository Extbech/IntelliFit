using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie();
builder.Services.AddAuthentication()
   .AddGoogle(options =>
   {
       IConfigurationSection googleAuthNSection =
       config.GetSection("Google");
       options.ClientId = googleAuthNSection["ClientId"];
       options.ClientSecret = googleAuthNSection["ClientSecret"];
   });
//    .AddFacebook(options =>
//    {
//        IConfigurationSection FBAuthNSection =
//        config.GetSection("Authentication:FB");
//        options.ClientId = FBAuthNSection["ClientId"];
//        options.ClientSecret = FBAuthNSection["ClientSecret"];
//    })
//    .AddMicrosoftAccount(microsoftOptions =>
//    {
//        microsoftOptions.ClientId = config["Authentication:Microsoft:ClientId"];
//        microsoftOptions.ClientSecret = config["Authentication:Microsoft:ClientSecret"];
//    })
//    .AddTwitter(twitterOptions =>
//    {
//        twitterOptions.ConsumerKey = config["Authentication:Twitter:ConsumerAPIKey"];
//        twitterOptions.ConsumerSecret = config["Authentication:Twitter:ConsumerSecret"];
//        twitterOptions.RetrieveUserDetails = true;
//    }
//    );

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
