using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace ChatOnline
{
    public class ChatHub : Hub
    {
        public async Task EnterChat(string username)
        {
            if (String.IsNullOrEmpty(username))
            {
                await Clients.Caller.SendAsync("NotifyCommonChat", "Для входа в общий чат введите логин");
            }
            else
            {
                await Clients.All.SendAsync("NotifyCommonChat", $"{username} вошел в общий чат");
            }
        }
        public async Task SendToCommonChat(string message, string userName)
        {
            await Clients.All.SendAsync("ReceiveInCommonChat", message, userName);
        }


        public async Task EnterGroup(string username,string groupname)
        {
            if (String.IsNullOrEmpty(username)||String.IsNullOrEmpty(groupname))
            {
                await Clients.Caller.SendAsync("NotifyGroup", "Для входа в группу введите логин и название группы");
            }
            else
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, groupname);
                await Clients.Group(groupname).SendAsync("NotifyGroup", $"{username} вошел в группу {groupname}");
            }
        }
        public async Task SendToGroup(string message, string userName,string groupName)
        {
            await Clients.Group(groupName).SendAsync("ReceiveInGroup", message, userName );
        }
       
    }
}
