import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTable from "datatables.net-dt";
import "@rakan/bootstrap4rtl"; 
import PageHeader from "../../components/PageHeader/PageHeader";
import useFormFields from "../../hooks/useFormFields.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllPermissionData, setMessageEmpty } from "../../features/user/userSlice.js";
import { errorToast } from "../../utils/toast.js";
import { createRole, deleteRole, updateRoleData } from "../../features/user/userApiSlice.js";
import { timeAgo } from "../../helpers/helpers.js";
import swal from "sweetalert";

const Role = () => {

    const dispatch = useDispatch();
    const { permission, role, error, message } = useSelector(getAllPermissionData);
    const [ selected, setSelected ] = useState([]);
    const [ roleEdit, setRoleEdit ] = useState({});

    // handle form fields
    const {input, handleInputChange, resetForm} = useFormFields({
        name: ""
    });

    // handle checkbox
    const handleCheckboxChange = (e) => {
        const val = e.target.value;
        const updatedList = [...selected];

        if (selected.includes(val)) {
            updatedList.splice(selected.indexOf(val), 1);
        }else{
            updatedList.push(val);
        }

        setSelected(updatedList);        

    }

    // handle role created
    const handleRoleCreate = (e) => {
        e.preventDefault();
        dispatch(createRole({            
            name: input.name,
            permissions: [...selected] 
        }));

        resetForm();
        setSelected([]);
    }

    // handle role delete
    const handleRoleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(deleteRole(id));
            } else {
                swal("Your data safe", {
                    icon: "success",
                  });
            }
          });         
    }

    // Role edit
    const handleRoleEdit = (id) => {
        const editData = role.find((data) => (data._id == id) );
        setRoleEdit(editData);
        setSelected(editData.permissions);
    }

    // Role Edit Change
    const handleRoleEditChange = (e) => {
        setRoleEdit((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }));
    }

    // handle Role form Update
    const handleRoleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateRoleData({
            id: roleEdit._id,
            name: roleEdit.name,
            permissions: selected
        }));
    }

    useEffect(() => {
		if (error) {
			errorToast(error);
			dispatch(setMessageEmpty());
		}
		if (message) {
			errorToast(message, "success");
			dispatch(setMessageEmpty());
		}
	},[error, message, dispatch]);

    useEffect(() => {
		new DataTable('.datatable');
	});
  return (
    <>
        <PageHeader title="Roles" />

        <ModalPopup target="RoleModalPopup">
            <form onSubmit={handleRoleCreate}>
                <div className="my-3">
                    <label htmlFor="">Role Name</label>
                    <input name="name" value={input.name} onChange={handleInputChange} className="form-control" type="text" />
                </div>
                <div className="my-3">
                    <label htmlFor="">Permissions</label>
                    { permission && permission?.map((item, index) => {
                        return (
                            <label  key={index} style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                <input name="name" value={item.name} type="checkbox" checked={selected.includes(item.name)} onChange={handleCheckboxChange} /> {item.name}
                            </label>
                        );
                    }) }                    
                </div>
                <div className="my-3">
                    <button className="btn btn-primary w-100" type="submit">Add new Role</button>
                </div>
            </form>
        </ModalPopup>

        <ModalPopup target="roleEdit">
            <form onSubmit={handleRoleUpdate}>
                <div className="my-3">
                    <label htmlFor="">Edit Role {roleEdit.name}</label>
                    <input name="name" value={roleEdit.name} onChange={handleRoleEditChange} className="form-control" type="text" />
                </div>
                <div className="my-3">
                    <label htmlFor="">Permissions</label>
                    { permission && permission?.map((item, index) => {
                        return (
                            <label  key={index} style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                <input name="name" value={item.name} type="checkbox" checked={selected?.includes(item.name)} onChange={handleCheckboxChange} /> {item.name}
                            </label>
                        );
                    }) }                    
                </div>
                <div className="my-3">
                    <button className="btn btn-primary w-100" type="submit">Update Role</button>
                </div>
            </form>
        </ModalPopup>

        <div className="row">
            <div className="col-md-12">
                <button className="btn btn-primary my-2" data-target="#RoleModalPopup" data-toggle="modal">Add new Role</button>
                <div className="card card-table">
                    <div className="card-header">
                        <h4 className="card-title">Role Data List</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive datatable-res">
                            {role ? <table className="datatable table table-hover table-center mb-0">
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Role Name</th>
                                        <th>Slug</th>
                                        <th>Permissions</th>
                                        <th>Created at</th>
                                        <th>Status</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...role].reverse().map((item, index) => {
                                        return ( 
                                        <tr key={index}>
                                            <td style={{ width: "20px" }}>{index +1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.slug}</td>
                                            <td>
                                                <ul>
                                                    { item.permissions.map((per, index) => {
                                                        return (
                                                            <li key={index}>{per}</li>
                                                        );
                                                    }) }
                                                </ul>
                                            </td>
                                            <td>{timeAgo(new Date(item.createdAt))}</td>
                                            <td>
                                                <div className="status-toggle">
                                                    <input type="checkbox" id="status_1" className="check" checked />
                                                    <label htmlFor="status_1" className="checktoggle">checkbox</label>
                                                </div>
                                            </td>
                                            <td className="text-right">
                                                <button onClick={() => handleRoleEdit(item._id)} data-toggle="modal" data-target="#roleEdit" className="btn btn-sm btn-warning mr-1"> <i className="fa fa-edit"></i> </button>
                                                <button onClick={() => handleRoleDelete(item._id)} className="btn btn-sm btn-danger"> <i className="fa fa-trash"></i> </button>
                                            </td>
                                        </tr>
                                         );
                                    })}                                    
                                </tbody>
                            </table> : <p style={{textAlign: "center", fontWeight: "400"}}>No data available in table</p> }
                            
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default Role