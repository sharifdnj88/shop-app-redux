import asyncHandler from "express-async-handler";
import { createSlug } from "../helper/slug.js";
import Permission from "../models/Permission.js";

/**
 * @DESC Get all Permissions data
 * @ROUTE /api/v1/Permission
 * @method GET
 * @access public
 */
export const getAllPermission = asyncHandler(async (req, res) => {
  const permissions = await Permission.find();

  if (permissions.length > 0) {
    res.status(200).json(permissions);
  }

});

/**
 * @DESC Get Single Permissions data
 * @ROUTE /api/v1/Permission/:id
 * @method GET
 * @access public
 */
export const getSinglePermission = asyncHandler(async (req, res) => {
  const  { id }  = req.params;

  const permission = await Permission.findById(id); 

  if (!permission) {
    return res.status(404).json({ message: "Permission data not found" });
  }else{
      res.status(200).json(permission);
  }

});

/**
 * @DESC Create new Permission
 * @ROUTE /api/v1/Permission
 * @method POST
 * @access public
 */
export const createPermission = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name ) {
    return res.status(400).json({ message: "Permission name is required" });
  }

  // Permission Check
  const permissionCheck = await Permission.findOne({name});

  if (permissionCheck) {
    return res.status(400).json({ message: "Name already exists" });
  }

  // create new Permission
  const permission =  await Permission.create({
    name,
    slug: createSlug(name)
  });

  res.status(200).json({permission, message: "Permission create successfully" });
});

/**
 * @DESC Delete Permission
 * @ROUTE /api/v1/Permission/:id
 * @method DELETE
 * @access public
 */
export const deletePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const permission = await Permission.findByIdAndDelete(id);
  res.status(200).json({ permission, message: "Permission deleted successfully" });
});

/**
 * @DESC Update Permission
 * @ROUTE /api/v1/Permission/:id
 * @method PUT/PATCH
 * @access public
 */
export const updatePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Permission name is required" });
  }

  const permission = await Permission.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name)
    },
    { new: true }
  );

  res.status(200).json(permission);
});


/**
 * @DESC Update Permission Status
 * @ROUTE /api/v1/Permission/:id
 * @method PUT/PATCH
 * @access public
 */
export const updatePermissionStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const permission = await Permission.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    { new: true }
  );

  res.status(200).json({permission, message: "Permission status update successfull"});
});
