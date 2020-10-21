using System;
using System.Collections.Generic;
using System.Linq;
using ActiveProbe.Utils.ViewModel.Identity;

public class MvcControllerViewModel
    {
        /// <summary>
        /// Return `AreaAttribute.RouteValue`
        /// </summary>
        public string AreaName { get; set; }

        /// <summary>
        /// Returns the list of the Controller's Attributes.
        /// </summary>
        public IList<Attribute> ControllerAttributes { get; set; }

        /// <summary>
        /// Returns the `DisplayNameAttribute` value
        /// </summary>
        public string ControllerDisplayName { get; set; }

        /// <summary>
        /// It's set to `{AreaName}:{ControllerName}`
        /// </summary>
        public string ControllerId => $"{AreaName}:{ControllerName}";

        /// <summary>
        /// Return ControllerActionDescriptor.ControllerName
        /// </summary>
        public string ControllerName { get; set; }

        /// <summary>
        /// Returns the list of the Controller's action methods.
        /// </summary>
        public IList<MvcActionViewModel> MvcActions { get; set; } = new List<MvcActionViewModel>();

        /// <summary>
        /// Returns `[{controllerAttributes}]{AreaName}.{ControllerName}`
        /// </summary>
        public override string ToString()
        {
            const string attribute = "Attribute";
            var controllerAttributes = string.Join(",", ControllerAttributes.Select(a => a.GetType().Name.Replace(attribute, "")));
            return $"[{controllerAttributes}]{AreaName}.{ControllerName}";
        }
    }