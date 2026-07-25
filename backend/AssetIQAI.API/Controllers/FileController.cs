using AssetIQAI.Infrastructure.DTOs.File;
using AssetIQAI.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AssetIQAI.API.Controllers;

[ApiController]
[Route("api/files")]
[Authorize(Roles = "Admin,Manager,Employee")]
public class FileController : ControllerBase
{
    private readonly IFileService _fileService;

    public FileController(IFileService fileService)
    {
        _fileService = fileService;
    }

    /// <summary>
    /// Upload an image
    /// </summary>
    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Upload([FromForm] FileUploadRequest request)
    {
        if (request.File == null)
        {
            return BadRequest(new
            {
                Message = "Please select an image."
            });
        }

        var imageUrl = await _fileService.UploadImageAsync(request.File);

        return Ok(new
        {
            Message = "Image uploaded successfully.",
            ImageUrl = imageUrl
        });
    }

    /// <summary>
    /// Delete uploaded image
    /// </summary>
    [HttpDelete("{fileName}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(string fileName)
    {
        var deleted = await _fileService.DeleteImageAsync(fileName);

        if (!deleted)
        {
            return NotFound(new
            {
                Message = "Image not found."
            });
        }

        return Ok(new
        {
            Message = "Image deleted successfully."
        });
    }
}