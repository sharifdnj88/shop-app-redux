// export const createSlug = (title) => {
//     const slugTitle = title.replace(/[^\w\s]/gi, "").toLowerCase();
//     (/^\s+|\s+$/g, '');
//     const slug = slugTitle.replace(/\s+/g, "-");
//     return slug;
// }

export const createSlug = (title) => {
    const slugTitle = title.replace(/^\s+|\s+$/g, '').toLowerCase();
    const slug = slugTitle.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    return slug;
}


