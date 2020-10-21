using System.Collections.Generic;
using System.ComponentModel;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;

using Microsoft.AspNetCore.Mvc;

namespace ActiveProbeCore.Controllers
{
    [Route("api/[controller]")]
    [DisplayName("انواع دستگاه")]
    [ApiController]
    public class MachineTypeController : ControllerBase
    {
        IMachineTypeService _machineType;
        public MachineTypeController(IMachineTypeService machineType)
        {
            _machineType= machineType;
        }
        //Machine Types
        [HttpGet]
        [Route("Index")]
        [DisplayName("لیست ")]
        public IEnumerable<MachineType> Index()
        {            
                  return _machineType.GetAll();           
        }
    }
}