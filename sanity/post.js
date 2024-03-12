import { defineField,defineArrayMember,defineType } from "sanity"//Sanity ke helper functions hai ye
export const post=defineType({
    name:"post",
    type:"document",
    title:"Post",
    fields:[
        {
            name:"title",
            type:"string",
            title:"Post Title",
            description:"Title of the post",
            validation:Rule=>Rule.required().error("This field is required")
            
        },
        //slug field
        defineField({
                   name:'slug',
                   type:'slug',
                   title:'Slug',
                   options: {
                    source: 'title',
                    maxLength: 200, // will be ignored if slugify is set
                   
                  },
                  validation:Rule=>Rule.required(),
        }),
        defineField({
            name:'author',
            type:'reference',
            Title:'Author',
            to:[{type: 'author'}]
        }),
        defineField({
            name:'summary',
            type:'text',
            title:'Summary',
            validation:Rule=>Rule.required(),
        }),
        // {
        //     name:"gender",
        //     type:"string",
        //     title:"Gender",
        //     options:{
        //         list:[
        //             {title:'Male',value:'male'},
        //             {title:'Female',value:'female'}

        //         ],
        //         layout:'radio',
        //         direction:'horizontal'

        //     }
        // }
        defineField({
            name:'image',
            type:'image',
            title:'Image'
        }),
        defineField({
            name:'content',
            type: 'array',
            title:'Content',
            of: [
                defineArrayMember(
                {type: 'block'})
            ]
        })
    ]
})