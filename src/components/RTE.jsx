import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full mt-4">
      {label && <label className="block text-sm font-semibold mb-2 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <div className="relative">
            <Editor
              initialValue={defaultValue}
              apiKey="r3428grhk04dvpq0gpzrvo4txg6rxgvd3xsoolhbqn2626ts"
              init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
              }}
              onEditorChange={onChange}
              className="w-full border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none mt-2"
            />
          </div>
        )}
      />
    </div>
  )
}
