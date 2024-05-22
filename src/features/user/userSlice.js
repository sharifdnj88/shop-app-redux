import { createSlice } from "@reduxjs/toolkit";
import { createPermission, createRole, createUser, deletePermission, deleteRole, deleteUser, getAllPermission, getAllRoles, getAllUser, updatePermissionStatusData, updateRoleData } from "./userApiSlice";


// create slice 
const userSlice = createSlice({
    name: "user",
    initialState: {
        permission: null,
        role: null,
        user: null,
        error: null,
        message: null
    },
    reducers: {
        setMessageEmpty: (state, action) => {
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPermission.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(getAllPermission.fulfilled, (state, action) => {
            state.permission = action.payload;
        }).addCase(createPermission.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(createPermission.fulfilled, (state, action) => {
            state.permission = state.permission ?? [];
            state.permission.push(action.payload.permission);
            state.message = action.payload.message;
        }).addCase(deletePermission.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(deletePermission.fulfilled, (state, action) => {
            state.permission = state.permission.filter((data) => (data._id !== action.payload.permission._id) );
            state.message = action.payload.message;
        }).addCase(updatePermissionStatusData.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(updatePermissionStatusData.fulfilled, (state, action) => {
            state.permission[state.permission.findIndex((data) => (data._id == action.payload.permission._id ) )] = action.payload.permission;
            state.message = action.payload.message;
        }).addCase(getAllRoles.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(getAllRoles.fulfilled, (state, action) => {            
            state.role = action.payload;
        }).addCase(createRole.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(createRole.fulfilled, (state, action) => {  
            state.role = state.role ?? [];          
            state.role.push(action.payload.role);
            state.message = action.payload.message;
        }).addCase(deleteRole.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(deleteRole.fulfilled, (state, action) => {  
            state.role = state.role.filter((data) => (data._id !== action.payload.role._id) );
            state.message = action.payload.message;
        }).addCase(updateRoleData.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(updateRoleData.fulfilled, (state, action) => {  
            state.role[state.role.findIndex((data) => (data._id == action.payload.role._id ) )] = action.payload.role;
        }).addCase(getAllUser.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(getAllUser.fulfilled, (state, action) => {  
            state.user = action.payload;
        }).addCase(createUser.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(createUser.fulfilled, (state, action) => {  
            state.user = state.user ?? [];
            state.message = action.payload.message;
            state.user.push(action.payload.user);
        }).addCase(deleteUser.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(deleteUser.fulfilled, (state, action) => {  
            state.user = state.user.filter((data) => (data._id !== action.payload.user._id) );
            state.message = action.payload.message;
        });
    }

});

// selector
export const getAllPermissionData = (state => state.user);

// actions
export const { setMessageEmpty } = userSlice.actions;

// export
export default userSlice.reducer;