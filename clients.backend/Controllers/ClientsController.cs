using clients.api.Interfaces;
using clients.api.Models;
using Microsoft.AspNetCore.Mvc;

namespace clients.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Tags("Clients")]
    [Produces("application/json")]
    public class ClientsController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientsController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet("")]
        [ProducesResponseType(typeof(ClientResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllAsync([FromQuery] string strategyGetData, [FromQuery] int page, [FromQuery] int limit)
        {
            try
            {
                ClientResponse? response = null;
                if (strategyGetData == "normal")
                {
                    response = await _clientService.GetAllAsync(page, limit);
                }
                else
                {
                    response = await _clientService.GetAllFromSPAsync(page, limit);
                }
                return Ok(response);
            }
            catch (Exception ex) 
            {
                var result = StatusCode(StatusCodes.Status500InternalServerError, ex);
                return result;
            } 
        }
    }
}
