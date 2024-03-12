import { defineField,defineType,defineArrayMember } from "sanity";
export const author=defineType(
    {
        name:'author',
        type:'document',
        title:'Author',
        fields:[
            defineField({
                name:'name',
                type:'string',
                title:'Author Name'
            }),
            defineField({
                name:'bio',
                type:'text',
                title:'Bio'
            }),
            defineField({
                name:'image',
                type:'image',
                title:'Image',
                options:{
                    hotspot:true,
                }
            })
        ]
    }
)