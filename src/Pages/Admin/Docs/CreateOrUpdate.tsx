import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '@/hooks/useAxios';
import { publish, subscribe, unsubscribe } from '@/utils/events';
import Dropzone from '@/components/Dropzone';
import PageHeader from '@/components/PageHeader';
import { baseURL } from '@/utils/helpers';
import '@/assets/prismjs/prism'
import '@/assets/prismjs/prism.css'

const CreateOrUpdate = () => {

  const navigate = useNavigate()

  const { id } = useParams()

  const [key, setKey] = useState(0)
  const [record, setRecord] = useState(null)

  const [title, setTitle] = useState('')
  const [contentShort, setContentShort] = useState('')
  const [content, setContent] = useState('')
  const [status_id, setStatusId] = useState('published')
  const [statuses, setStatuses] = useState([])


  const [files, setFiles] = useState([]);

  const editorRef = useRef(null);

  const { get } = useAxios()
  const { post, errors } = useAxios()

  useEffect(() => {

    if (id) {
      get(`admin/docs/detail/${id}`).then(res => {

        if (res) {
          const { data, statuses } = res
          setRecord(data)
          setTitle(data.title)
          setContentShort(data.content_short)
          setContent(data.content)
          setStatusId(data.status_id)

          setStatuses(statuses)

        }
      })

    }

  }, [id])

  useEffect(() => {
    if (!id) {

      get('/admin/settings/picklists/statuses/post?all=1').then((res) => {

        if (res) {
          setStatuses(res)

          setKey((curr) => curr + 1)
          setRecord(null);
          setTitle('');
          setContentShort('');
          setContent('');
          setStatusId(res.find((status: any) => status.name === 'published').id || 0);

        }
      })
    }

  }, [id]);

  useEffect(() => {

    const handleAjaxPostDone = (event: Event) => {
      if (event?.detail) {
        const { elementId, results } = event.detail;

        if (elementId === 'docs-form' && results) {
          navigate('/admin/docs/detail/' + results.id + '/edit');
        }
      }
    };

    subscribe('ajaxPostDone', handleAjaxPostDone)

    return () => unsubscribe('ajaxPostDone', handleAjaxPostDone)

  }, [])

  return (
    <div>
      <PageHeader title={`${id ? 'Edit Doc #' + id : 'Create Doc'}`} listUrl='/admin/docs' />
      <div className='card'>
        <div className="card-body">
          <form key={key} id={`docs-form`} onSubmit={(e) => publish('ajaxPost', e, { image: files[0] })}
            action-url={
              record
                ? `/admin/docs/detail/${record.id}`
                : 'admin/docs'
            }
            encType='multipart/form-data'
          >
            {record && statuses && <input type="hidden" value="put" name="_method" />}
            <div className='d-flex justify-content-end'>
              <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                <button type="submit" className="btn btn-primary">Publish</button>
                <div className="btn-group" role="group">
                  <button id="btnGroupDrop1" type="button" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    More
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    {statuses.map(status => (
                      <li key={status.id}><button type="submit" onClick={() => setStatusId(status.id)} className="dropdown-item btn btn-warning d-flex align-items-center gap-1"><Icon icon={`bi:bookmark`} />Save as {status.name}</button></li>
                    ))}
                  </ul>
                </div>
              </div>
              <input type="hidden" name='status_id' defaultValue={status_id} />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" defaultValue={title} className='form-control' />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="content_short">Content short</label>
              <input type="text" id="content_short" name="content_short" defaultValue={contentShort} className='form-control' />
            </div>
            <div className="form-group mb-3">
              <div className='form-control'>
                <Editor
                  apiKey='mz1183ucpn97bk3xqa6ewok8bboqvpbk0rd9ssba16wpekvf'
                  onInit={(evt, editor) => editorRef.current = editor}
                  initialValue={content}
                  init={{
                    height: 500,
                    menu: {
                      file: { title: 'File', items: 'newdocument restoredraft | preview | print ' },
                      edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
                      view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
                      insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
                      format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat' },
                      tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
                      table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
                      help: { title: 'Help', items: 'help' }
                    },

                    plugins: [
                      'image', 'codesample'
                    ],

                    toolbar: 'undo redo | formatselect | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help codesample',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

                    /* enable title field in the Image dialog*/
                    image_title: true,
                    /* enable automatic uploads of images represented by blob or data URIs*/
                    automatic_uploads: true,
                    file_picker_types: 'image',
                    images_upload_credentials: true,
                    /* and here's our custom image picker*/
                    file_picker_callback: function (cb, value, meta) {
                      var input = document.createElement('input');
                      input.setAttribute('type', 'file');
                      input.setAttribute('accept', 'image/*');

                      input.onchange = function () {
                        var file = this.files[0];

                        // Create a FormData object to send the file to the server
                        var formData = new FormData();
                        formData.append('image', file);
                        formData.append('files_folder', 'documentation');

                        post('/admin/file-repo/upload-image', formData).then((results) => {

                          if (results) {
                            const { data, token } = results

                            cb(baseURL('/admin/file-repo/' + data.path + '?token=' + token), { title: data.caption, class: 'asas' });
                          }

                        })

                      };

                      input.click();
                    },
                    image_class_list: [
                      { title: 'Autofetch Image', value: 'autofetch-image' },
                    ]
                  }}
                  onChange={(e) => setContent(e.target.getContent())}
                />
                <textarea defaultValue={content} name="content" className='d-none'></textarea>
              </div>
            </div>

            <div className="form-group mb-3 col-6 ms-auto">
              <div className='form-control' id='image' >
                <Dropzone files={files} setFiles={setFiles} fileType='featured image' maxFiles={1} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default CreateOrUpdate