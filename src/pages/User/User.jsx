import { useEffect } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTable from "datatables.net-dt";
import "@rakan/bootstrap4rtl"; 
import "./User.scss"
import PageHeader from "../../components/PageHeader/PageHeader";
import { generateRandomPassword, timeAgo } from "../../helpers/helpers";
import useFormFields from "../../hooks/useFormFields";
import { useDispatch, useSelector } from "react-redux";
import { createUser, deleteUser } from "../../features/user/userApiSlice";
import { errorToast } from "../../utils/toast";
import { setMessageEmpty } from "../../features/user/userSlice";
import swal from "sweetalert";

const User = () => {

    const dispatch = useDispatch();
    const { user, role, error, message } = useSelector((state) => state.user);

    const { input, handleInputChange, resetForm, setInput } = useFormFields({
        name: "",
        email: "",
        password: "",
    });

    const handleRandomPassword = (e) => {
        e.preventDefault();
        const rp_pass = generateRandomPassword(20);
        setInput((prevState) => ({
            ...prevState,
            password: rp_pass
        }));
    }

    // handle User Create
    const handleUserCreate = (e) => {
        e.preventDefault();
        dispatch(createUser(input));
        resetForm();
    }

    // handle User delete
    const handleUserDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(deleteUser(id));
            } else {
                swal("Your data safe", {
                    icon: "success",
                  });
            }
          });   
        
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
        <PageHeader title="Users" />

        <ModalPopup target="userModalPopup">
            <form onSubmit={handleUserCreate}>
                <div className="my-3">
                    <label htmlFor="">Name</label>
                    <input name="name" value={input.name} onChange={handleInputChange} className="form-control" type="text" />
                </div>
                <div className="my-3">
                    <label htmlFor="">Email</label>
                    <input name="email" value={input.email} onChange={handleInputChange} className="form-control" type="text" />
                </div>
                <div className="my-3">
                    <label htmlFor="">Password</label>
                    <input name="password" value={input.password} onChange={handleInputChange} className="form-control" type="text" />
                    <a onClick={handleRandomPassword} className="badge bg-dark text-light" href="#">Random Password</a>
                </div>
                <div className="my-3">
                    <select name="role" value={input.role} onChange={handleInputChange} className="form-control">
                        <option>-select-</option>
                        { role?.map((item, index) => {
                            return (
                                <option key={index} value={item._id}>{item.name}</option>
                            );
                        }) }
                    </select>
                </div>
                <div className="my-3">
                <button className="btn btn-primary w-100" type="submit">Add new User</button>
                </div>
            </form>
        </ModalPopup>

        <div className="row">
            <div className="col-md-12">
                <button className="btn btn-primary my-2" data-target="#userModalPopup" data-toggle="modal">Add new user</button>
                <div className="card card-table">
                    <div className="card-header">
                        <h4 className="card-title">User Data List</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive datatable-res">
                            { user ? <table className="datatable table table-hover table-center mb-0 table-bordered">
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Created At</th>
                                        <th>Status</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {[...user].reverse().map((item, index) => {
                                    return (
                                        <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role?.name}</td>
                                        <td>{timeAgo(new Date(item.createdAt))}</td>
                                        <td>
                                            <div className="status-toggle">
                                                <input type="checkbox" id="status_1" className="check" checked />
                                                <label htmlFor="status_1" className="checktoggle">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="text-right">
                                                <button data-toggle="modal" data-target="#roleEdit" className="btn btn-sm btn-warning mr-1"> <i className="fa fa-edit"></i> </button>
                                                <button onClick={() => handleUserDelete(item._id)} className="btn btn-sm btn-danger"> <i className="fa fa-trash"></i> </button>
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

export default User