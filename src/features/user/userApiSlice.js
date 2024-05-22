import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all Permission
export const getAllPermission = createAsyncThunk("user/getAllPermission", async () => {
    try {
        const response = await axios.get("http://localhost:5050/api/v1/permission", {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// Create Permission
export const createPermission = createAsyncThunk("user/createPermission", async (data) => {
    try {
        const response = await axios.post("http://localhost:5050/api/v1/permission", data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// Delete Permission
export const deletePermission = createAsyncThunk("user/deletePermission", async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5050/api/v1/permission/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// Update Permission status
export const updatePermissionStatusData = createAsyncThunk("user/updatePermissionStatusData", async ({id, status}) => {
    try {
        const response = await axios.put(`http://localhost:5050/api/v1/permission/status/${id}`, {status}, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});


// Create Role
export const createRole = createAsyncThunk("user/createRole", async (data) => {
    try {
        const response = await axios.post("http://localhost:5050/api/v1/role", data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// get all Role
export const getAllRoles = createAsyncThunk("user/getAllRoles", async () => {
    try {
        const response = await axios.get("http://localhost:5050/api/v1/role", {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// Delete Role
export const deleteRole = createAsyncThunk("user/deleteRole", async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5050/api/v1/role/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// Update Role
export const updateRoleData = createAsyncThunk("user/updateRoleData", async (data) => {
    try {
        const response = await axios.put(`http://localhost:5050/api/v1/role/${data.id}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// Create User
export const createUser = createAsyncThunk("user/createUser", async (data) => {
    try {
        const response = await axios.post("http://localhost:5050/api/v1/user", data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// get all User
export const getAllUser = createAsyncThunk("user/getAllUser", async () => {
    try {
        const response = await axios.get("http://localhost:5050/api/v1/user", {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

// Delete User
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5050/api/v1/user/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});