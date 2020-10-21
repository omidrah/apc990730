using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
/*
  Excetpion MiddleWare 
  omid 
*/
public class ErrorHandlingMiddleware
{
	private readonly RequestDelegate next;

	public ErrorHandlingMiddleware(RequestDelegate next)
	{
		this.next = next;
	}

	public async Task Invoke(HttpContext context, ILogger<ErrorHandlingMiddleware> _logger)
	{
		try
		{
			await next(context);
		}
		catch (Exception ex)
		{
				await HandleExceptionAsync(context, ex, _logger);
		}
	}

	private static Task HandleExceptionAsync(
		HttpContext context,
		Exception exception,
		ILogger<ErrorHandlingMiddleware> _logger)
	{
		var code = HttpStatusCode.InternalServerError; // 500 if unexpected
		_logger.LogError("Unhandled excetion. {0}", exception);
		var result = JsonConvert.SerializeObject(
			new ErrorResponse
			{
				Error = exception.InnerException,
				ErrorDescription = exception.Message
			});
		context.Response.ContentType = "application/json";
		context.Response.StatusCode = (int)code;
		return context.Response.WriteAsync(result);
	}
}

internal class ErrorResponse
{
    public Exception Error { get; internal set; }
    public string ErrorDescription { get; set; }
}