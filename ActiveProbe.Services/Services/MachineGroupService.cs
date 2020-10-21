using System.Collections.Generic;
using System.Linq;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using Microsoft.EntityFrameworkCore;

namespace ActiveProbe.Services
{
    public class MachineGroupService : GenericService<MachineGroup>, IMachineGroupService
    {
        public MachineGroupService(IUnitOfWork uow) : base(uow)
        {
        }
        //machine parents
        public IList<int> GetMachineParent(int machineId, IList<int> ParentIds)
        {
            ParentIds.Add(machineId);
            var grpOfmachine = _uow.Set<Machine>().FirstOrDefault(x => x.Id == machineId);

            if (grpOfmachine.MachineGroupId != null)
            {
                getParentId((int)grpOfmachine.MachineGroupId, ParentIds);
            }
            return ParentIds;
        }
        //group Parents
        public IList<int> GetGroupParent(int grpId, IList<int> ParentIds)
        {
            try
            {

                ParentIds.Add(grpId);
                var curRec = _tEntities.FirstOrDefault(x => x.Id == grpId);
                if (curRec.ParrentId != null)
                {
                    getParentId((int)curRec.ParrentId, ParentIds);
                }
                return ParentIds;
            }
            catch (System.Exception ex)
            {

                throw ex;
            }
        }

        public IList<int> GetGroupChilds(int grpId, IList<int> childIds)
        {
            try
            {
                childIds.Add(grpId);
                _tEntities.Include(x => x.Machine);
                var childs = _tEntities.Where(x => x.ParrentId == grpId)
                                       .Select(t => t.Id)
                                       .ToList();
                if (childs.Count > 0)
                {
                    childs.ForEach(t => {
                        childIds.Add(t);
                        getChildIds(t, childIds);
                    });

                }
                return childIds;
            }
            catch (System.Exception ex)
            {

                throw ex;
            }
        }

        private void getParentId(int groupId, IList<int> ParentIds)
        {
            _tEntities.Include(x => x.Machine);
            var curRec = _tEntities.FirstOrDefault(x => x.Id == groupId);
            ParentIds.Add(curRec.Id);
            if (curRec.ParrentId != null)
            {
                getParentId((int)curRec.ParrentId, ParentIds);
            }
            return;
        }

        private void getChildIds(int groupId, IList<int> childIds)
        {
            _tEntities.Include(x => x.Machine);
            var childs = _tEntities.Where(x => x.ParrentId == groupId)
                                   .Select(t => t.Id)
                                   .ToList();
            if (childs.Count > 0)
            {
                childs.ForEach(t => {
                    childIds.Add(t);
                    getChildIds(t, childIds);
                });

            }
            return;
        }
    }
}