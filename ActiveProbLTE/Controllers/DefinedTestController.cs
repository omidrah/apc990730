using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Utils.ViewModel;
using ActiveProbe.Domain.Models;
using ActiveProbe.DataLayer.Context;
using Microsoft.AspNetCore.Authorization;
using ActiveProbe.Services;
using System.ComponentModel;

namespace ActiveProbeCore.Controllers
{
    //Used for test crud
    [Route("api/[controller]")]
    [Authorize(Policy=ConstantPolicies.dynKkomAuthorization)]
    [DisplayName("تعریف تست ")]
    [ApiController]
    public class DefinedTestController : ControllerBase
    {        
        private ITestService _test;
        private IUnitOfWork _uow;
        public DefinedTestController( ITestService test, IUnitOfWork uow)
        {
            _test = test;
            _uow = uow;
        }
        [HttpGet]
        [Route("Index")]
        [DisplayName("لیست تست ها")]
        public async Task<IList<DefinedTestVm>> Index()
        {
            return await _test.GetAllAsync().ConfigureAwait(false);
        }
        [HttpGet]
        [Route("Details/{id}")]
        [DisplayName("جزییات تست ")]
        public DefinedTestVm Details(int id)
        {
            return  _test.GetByIdAsync(id);
        }
        [HttpGet]
        [Route("CheckTitle")]
        public DefinedTest CheckTitle(string title)
        {            
            return _test.Find(x=>x.Title==title) ?? new DefinedTest();
        }
        [HttpPost]
        [Route("Create")]
        [DisplayName("تعریف تست ")]
        public async Task<int> Create([FromBody] DefinedTest definedTest)
        {

            //Validations:
            if (definedTest.RepeatTypeId == 2)
            {
                if (definedTest.RepeatTime == null)
                {
                    //Repeat Time Must Have VAlue
                    return -1;
                }
            }
            if (definedTest.RepeatTypeId == 3)
            {
                if (definedTest.RepeatCount == null)
                {
                    //Repeat Count Must Have VAlue
                    return -2;
                }
            }
            _test.Add(definedTest);
            return await _uow.SaveChangesAsync();

        }
        [HttpDelete]
        [Route("Delete/{id}")]
        [DisplayName("حذف تست")]
        public async Task<int> Delete(int id)
        {
            var exist = _test.Find(x => x.Id == id);
            if (exist != null)
            {
                _test.Delete(exist);
                return await _uow.SaveChangesAsync();
            }
            return 0; //donot existt
        }
        [HttpPut]
        [Route("Edit")]
        [DisplayName("ویرایش تست")]
        public async Task<int> Edit([FromBody] DefinedTest definedTest)
        {
            _uow.Entry<DefinedTest>(definedTest);
            _uow.MarkAsChanged(definedTest);
            return await _uow.SaveChangesAsync();
        }
    }
}