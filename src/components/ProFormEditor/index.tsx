import React, { useState, useRef, useEffect } from 'react';
import ProForm from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form';
import { Editor } from '@tinymce/tinymce-react';
import { message } from 'antd';

interface TinymceEditorProps {
  name?: string;
  value: string;
  // value: string;
  onChange?: any;
}
const TinymceEditor: React.FC<TinymceEditorProps> = (props: TinymceEditorProps) => {
  const [value, setValue] = useState(props.value ?? '');
  useEffect(() => setValue(props.value), [props.value]);

  const editorRef: any = useRef(null);
  // const handleImageUpload = async (blobInfo: any, success: Function, failure: Function) => {
  //   if ('image/jpeg, image/png'.indexOf(blobInfo.blob().type) >= 0) {
  //     let formdata = new FormData();
  //     formdata.set('file', blobInfo.blob());
  //     //调用自己实现的后台文件上传api
  //     // services.api.upload(formdata).then((res) => {
  //     //   if (res.code === 201) {
  //     //     success(res.data);
  //     //   } else {
  //     //     failure('上传失败');
  //     //   }
  //     // });
  //   } else {
  //     failure('上传图片只能是 JPG 或 PNG 格式!');
  //   }
  // };
  // const images_upload_handler = async (blobInfo: any, progress: any) => {
  //   try {
  //     if (blobInfo.blob().size > 20 * 1024 * 1024) {
  //       throw new Error('上传图片大小不能超过 20MB');
  //     }
  //     if ('image/jpeg, image/png'.indexOf(blobInfo.blob().type) >= 0) {
  //       throw new Error('上传图片只能是 JPG 或 PNG 格式!');
  //     }
  //     let formdata = new FormData();
  //     formdata.set('file', blobInfo.blob());
  //   } catch (error: any) {
  //     message.error(error.message)
  //   }
  // }
  const images_upload_handler = (blobInfo: any, progress: any): any =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', 'postAcceptor.php');

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject('HTTP Error: ' + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);

        if (!json || typeof json.location != 'string') {
          reject('Invalid JSON: ' + xhr.responseText);
          return;
        }

        resolve(json.location);
      };

      xhr.onerror = () => {
        reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
      };

      const formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    });
  const file_picker_callback = async (cb: any, v: any, meta: any) => {
    console.log(cb, v);
    //当点击meidia图标上传时,判断meta.filetype == 'media'有必要，因为file_picker_callback是media(媒体)、image(图片)、file(文件)的共同入口
    if (meta.filetype == 'media') {
      //创建一个隐藏的type=file的文件选择input
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.onchange = async function (this: any) {
        const file = this.files[0];
        const formdata = new FormData();
        formdata.set('file', file);
        // services.api.upload(formdata).then((res) => {
        //   if (res.code === 201) {
        //     cb(res.data);
        //   } else {
        //     message.error('上传失败');
        //   }
        // });
      };
      //触发点击
      input.click();
    }
    if (meta.filetype == 'file') {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.onchange = async function (this: any) {
        const file = this.files[0];
        const maxSize = 100 * 1024 * 1024;
        if (file.size > maxSize) {
          message.error('上传文件大小不能超过 100MB');
        } else {
          const extensions = [
            '.jpg',
            '.jpeg',
            '.png',
            '.zip',
            '.rar',
            '.doc',
            '.docx',
            '.xls',
            '.xlsx',
            '.ppt',
            '.pptx',
            '.pdf',
          ];
          const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
          if (extensions.indexOf(extension) > -1) {
            const formdata = new FormData();
            formdata.set('file', file);
            // services.api.upload(formdata).then((res) => {
            //   if (res.code === 201) {
            //     let mediaLocation = res.data;
            //     cb(mediaLocation, {
            //       title: file.name,
            //     });
            //   } else {
            //     message.error('上传失败');
            //   }
            // });
          } else {
            message.error('上传文件只能是 jpg, png,zip,rar,doc,docx,xls,xlsx,ppt,pptx,pdf 格式!');
          }
        }
      };
      //触发点击
      input.click();
    }
  };
  // , editor: any
  const handleChange = (newValue: any) => {
    console.log(157, newValue);
    setValue(newValue);
    props.onChange(newValue);
  };
  return (
    <Editor
      inline={false}
      id={`tincyEditor-${props.name}`}
      apiKey="1fqzbk2i5sju2syu6w86jj1km6enlmr1yx9f3dct1ga8ojvk"
      // tinymceScriptSrc='https://cdn.bootcdn.net/ajax/libs/tinymce/6.0.1/tinymce.min.js'
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        language: 'zh_CN',
        height: 500,
        min_height: 500,
        font_family_formats:
          "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
        plugins:
          'preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker editimage help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export',
        tinydrive_token_provider: 'URL_TO_YOUR_TOKEN_PROVIDER',
        tinydrive_dropbox_app_key: 'YOUR_DROPBOX_APP_KEY',
        tinydrive_google_drive_key: 'YOUR_GOOGLE_DRIVE_KEY',
        tinydrive_google_drive_client_id: 'YOUR_GOOGLE_DRIVE_CLIENT_ID',
        mobile: {
          plugins:
            'preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable',
        },
        menu: {
          tc: {
            title: 'Comments',
            items: 'addcomment showcomments deleteallconversations',
          },
        },
        menubar: 'file edit view insert format tools table tc help',
        toolbar:
          'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        image_advtab: true,
        link_list: [
          { title: 'My page 1', value: 'https://www.tiny.cloud' },
          { title: 'My page 2', value: 'http://www.moxiecode.com' },
        ],
        image_list: [
          { title: 'My page 1', value: 'https://www.tiny.cloud' },
          { title: 'My page 2', value: 'http://www.moxiecode.com' },
        ],
        image_class_list: [
          { title: 'None', value: '' },
          { title: 'Some class', value: 'class-name' },
        ],
        importcss_append: true,
        templates: [
          {
            title: 'New Table',
            description: 'creates a new table',
            content:
              '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
          },
          {
            title: 'Starting my story',
            description: 'A cure for writers block',
            content: 'Once upon a time...',
          },
          {
            title: 'New list with dates',
            description: 'New List with dates',
            content:
              '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
          },
        ],
        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        image_caption: true,
        quickbars_selection_toolbar:
          'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
        tinycomments_mode: 'embedded',
        // content_style: '.mymention{ color: gray; }',
        contextmenu: 'link image editimage table configurepermanentpen',
        a11y_advanced_options: true,
        // images_upload_handler: (blobInfo: any, success: any, failure: any) => {
        //   return handleImageUpload(blobInfo, success, failure);
        // },
        images_upload_handler,
        file_picker_callback,
      }}
      // value={props.value}
      value={value}
      onEditorChange={handleChange}
    />
  );
};

const ProFormEditor: React.FC<ProFormItemProps> = (props: ProFormItemProps) => {
  return (
    <ProForm.Item {...props}>
      <TinymceEditor
        name={props.name}
        value={props.initialValue}
        onChange={(value: any) => {
          console.log(260, value);
        }}
      />
    </ProForm.Item>
  );
};

export default ProFormEditor;
