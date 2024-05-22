import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTable from "datatables.net-dt";
import "@rakan/bootstrap4rtl"; 
import PageHeader from "../../components/PageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { createPermission, deletePermission, updatePermissionStatusData } from "../../features/user/userApiSlice";
import { getAllPermissionData, setMessageEmpty } from "../../features/user/userSlice";
import { errorToast } from "../../utils/toast";
import swal from "sweetalert";
import { timeAgo } from "../../helpers/helpers";

const Permission = () => {

    const dispatch = useDispatch();
    const { permission, error, message } = useSelector((getAllPermissionData));

    const [input, setInput] = useState({
        name: ""
    });

    // handle input change
	const handleInputChange = (e) => {
		setInput((prevState) => ({
			...prevState,
			[e.target.name] : e.target.value
		}));
	}

    // form submit
    const handlePermissionSubmit = (e) => {
        e.preventDefault();
        dispatch(createPermission(input));
        setInput({
            name: "",
        });
    }

    // handle delete permission
    const handlePermissionDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
             dispatch(deletePermission(id));
            } else {
                swal("Your data safe", {
                    icon: "success",
                  });
            }
          });       
    }

    // handle status update
    const handleStatusUpdate = (id, status) => {
        dispatch(updatePermissionStatusData({id, status}));
    }

    useEffect(() => {
		if (error && permission) {
			errorToast(error);
			dispatch(setMessageEmpty());
		}
		if (message) {
			errorToast(message, "success");
			dispatch(setMessageEmpty());
		}
	},[error, message,permission, dispatch]);
    

    useEffect(() => {
		new DataTable('.datatable');
	});

  return (
    <>
        <PageHeader title="Permissions" />

        <ModalPopup target="PermissionModalPopup">
            <form onSubmit={handlePermissionSubmit}>
                <div className="my-3">
                    <label htmlFor="">Permission Name</label>
                    <input name="name" value={input.name} onChange={handleInputChange} className="form-control" type="text" />
                </div>
                <div className="my-3">
                    <button className="btn btn-primary w-100" type="submit">Add new permission</button>
                </div>
            </form>
        </ModalPopup>

        <div className="row">
            <div className="col-md-12">
                <button className="btn btn-primary my-2" data-target="#PermissionModalPopup" data-toggle="modal">Add new Permission</button>
                <div className="card card-table">
                    <div className="card-header">
                        <h4 className="card-title">Permission Data List</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive datatable-res">
                        { permission ?  <table className="datatable table table-hover table-center mb-0">
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Name</th>
                                        <th>Slug</th>
                                        <th>Created at</th>
                                        <th>Status</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { [...permission].reverse().map((item, index) => {
                                        return(
                                        <tr key={index}>
                                            <td>{index +1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.slug}</td>
                                            <td>{timeAgo(new Date(item.createdAt))}</td>
                                            <td>
                                                <div className="status-toggle">
                                                    <input type="checkbox" id="status_1" className="check" checked={item.status ? true : false} />
                                                    <label onClick={() => handleStatusUpdate(item._id, item.status)} htmlFor="status_1" className="checktoggle">checkbox</label>
                                                </div>
                                            </td>
                                            <td className="text-right">
                                                <button onClick={() => handlePermissionDelete(item._id)} className="btn btn-sm btn-danger"> <i className="fa fa-trash"></i> </button>
                                            </td>
                                        </tr>
                                        );
                                    }) }                                    
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

export default Permission