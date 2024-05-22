import asyncHandler from "express-async-handler";
import { createSlug } from "../helper/slug.js";
import Role from "../models/Role.js";

/**
 * @DESC Get all Roles data
 * @ROUTE /api/v1/Role
 * @method GET
 * @access public
 */
export const getAllRole = asyncHandler(async (req, res) => {
  const roles = await Role.find();

  if (roles.length > 0) {
    res.status(200).json(roles);
  }

});

/**
 * @DESC Get Single Roles data
 * @ROUTE /api/v1/Role/:id
 * @method GET
 * @access public
 */
export const getSingleRole = asyncHandler(async (req, res) => {
  const  { id }  = req.params;
  const role = await Role.findById(id); 
  if (!role) {
    return res.status(404).json({ message: "Role data not found" });
  }else{
      res.status(200).json(role);
  }

});

/**
 * @DESC Create new Role
 * @ROUTE /api/v1/Role
 * @method POST
 * @access public
 */
export const createRole = asyncHandler(async (req, res) => {
  const { name, permissions } = req.body;
  if (!name ) {
    return res.status(400).json({ message: "Role name is required" });
  }

  // Role Check
  const RoleCheck = await Role.findOne({name});

  if (RoleCheck) {
    return res.status(400).json({ message: "Name already exists" });
  }

  // create new Role
  const role = await Role.create({
    name,
    slug: createSlug(name),
    permissions
  });

  res.status(200).json({ role, message: "Role create successfully" });
});

/**
 * @DESC Delete Role
 * @ROUTE /api/v1/Role/:id
 * @method DELETE
 * @access public
 */
export const deleteRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const role = await Role.findByIdAndDelete(id);
  res.status(200).json({role, message: "Role deleted successfull"});
});

/**
 * @DESC Update Role
 * @ROUTE /api/v1/Role/:id
 * @method PUT/PATCH
 * @access public
 */
export const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, permissions } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Role name is required" });
  }

  const role = await Role.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name),
      permissions
    },
    { new: true }
  );

  res.status(200).json({role, message: "Role updated successfull"});
});
