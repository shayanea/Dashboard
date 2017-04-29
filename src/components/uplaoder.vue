<template>
    <input class="custom-file-input" type="file" @change="onChange" :index="index" :multiple="multiple" accept="image/*" />
</template>


<script>
export default {
    props: {
        // Support Multiple File?
        multiple: {
            type: Boolean,
            default: false
        },
        index: {
            default: ''
        },
        // Pass the files info when it's done
        done: {
            type: Function,
            default: () => { }
        }
    },
    methods: {
        onChange(e) {
            // get the files
            let files = e.target.files;
            // Process each file
            var allFiles = []
            for (var i = 0; i < files.length; i++) {
                let file = files[i]
                // Make new FileReader
                let reader = new FileReader()
                // Convert the file to base64 text
                reader.readAsDataURL(file)
                // on reader load somthing...
                reader.onload = () => {
                    // Make a fileInfo Object
                    let fileInfo = {
                        name: file.name,
                        type: file.type,
                        size: Math.round(file.size / 1000) + ' kB',
                        base64: reader.result,
                        file: file,
                        index: this.index
                    }
                    // Push it to the state
                    allFiles.push(fileInfo)
                    // If all files have been proceed
                    if (allFiles.length == files.length) {
                        // Apply Callback function
                        if (this.multiple) this.done(allFiles)
                        else this.done(allFiles[0])
                    }
                } // reader.onload
            } // for
        }, // onChange()
    }
};
</script>

<style scope>
.custom-file-input{
    width: 76px;
    float: right;
    outline: none!important;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
  outline: none;
}
.custom-file-input::before {
  content: 'آپلود عکس';
  display: inline-block;
  background: #363636;
  border: 1px solid #363636;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  color: #fff;
  font-weight: 700;
  font-size: 10pt;
}
.custom-file-input:hover::before{
    opacity: .8;
}
.custom-file-input:hover::before {
  border-color: black;
  outline: none;
}
.custom-file-input:active::before {
  background: #363636;
  outline: none;
}
</style>