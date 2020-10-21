using System;
using System.Collections.Generic;
using System.Linq;

namespace ActiveProbe.Utils.ViewModel.Identity
{
  public class MvcActionViewModel
    {
        /// <summary>
        /// Returns the list of Attributes of the action method.
        /// </summary>
        public IList<Attribute> ActionAttributes { get; set; }

        /// <summary>
        /// Returns `DisplayNameAttribute` value of the action method.
        /// </summary>
        public string ActionDisplayName { get; set; }

        /// <summary>
        /// It's set to `{ControllerId}:{ActionName}`
        /// </summary>
        public string ActionId => $"{ControllerId}:{ActionName}";

        /// <summary>
        /// Return ControllerActionDescriptor.ActionName
        /// </summary>
        public string ActionName { get; set; }

        /// <summary>
        /// It's set to `{AreaName}:{ControllerName}`
        /// </summary>
        public string ControllerId { get; set; }

        /// <summary>
        /// Returns true if the action method has an `AuthorizeAttribute`.
        /// </summary>
        public bool IsSecuredAction { get; set; }


        /// <summary>
        /// Returns `[{actionAttributes}]{ActionName}`
        /// </summary>
        public override string ToString()
        {
            const string attribute = "Attribute";
            var actionAttributes = string.Join(",", ActionAttributes.Select(a => a.GetType().Name.Replace(attribute, "")));
            return $"[{actionAttributes}]{ActionName}";
        }
    }
}