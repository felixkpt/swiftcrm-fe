import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import useAxios from '@/hooks/useAxios';
import { publish, subscribe, unsubscribe } from '@/utils/events';
import Dropzone from '@/components/Dropzone';

const CreateOrUpdate = () => {

  const navigate = useNavigate()

  const { id } = useParams()

  const [key, setKey] = useState(0)
  const [record, setRecord] = useState(null)

  const [title, setTitle] = useState('')
  const [contentShort, setContentShort] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('published')

  const [files, setFiles] = useState([]);

  const editorRef = useRef(null);

  const { get } = useAxios()

  useEffect(() => {

    if (id) {
      get(`admin/documentation/documentation/${id}`).then(res => {

        if (res) {
          const { data } = res
          setRecord(data)
          setTitle(data.title)
          setContentShort(data.content_short)
          setContent(data.content)
          setStatus(data.status)
        }
      })

    }
  }, [id])

  useEffect(() => {
    if (!id) {
      setKey((curr) => curr + 1)
      setRecord(null);
      setTitle('');
      setContentShort('');
      setContent('');
      setStatus('published');
    }
  }, [id]);

  useEffect(() => {

    const handleAjaxPostDone = (event: Event) => {
      if (event?.detail) {
        const { elementId, results } = event.detail;

        if (elementId === 'docs-form' && results) {
          navigate('/admin/documentation/documentation/' + results.slug + '/edit');
        }
      }
    };

    subscribe('ajaxPostDone', handleAjaxPostDone)

    return () => unsubscribe('ajaxPostDone', handleAjaxPostDone)

  }, [])

  return (
    <div className='card'>
      <div className="card-body">
        <NavLink to={`/admin/documentation`} className='btn btn-outline-light shadow'>
          <span className='d-flex align-items-center gap-1'>All docs
            <Icon className='font-large' icon={`humbleicons:arrow-go-back`} />
          </span>
        </NavLink>

        <form key={key} id={`docs-form`} onSubmit={(e) => publish('ajaxPost', e, { files })}
          action-url={
            record
              ? `/admin/documentation/documentation/${record.id}`
              : 'admin/documentation'
          }
          encType='multipart/form-data'
        >
          {record && <input type="hidden" value="put" name="_method" />}
          <input type="hidden" name="files_folder" value="testingfolder" />
          <div className='d-flex justify-content-end'>
            <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
              <button type="submit" onClick={() => setStatus('published')} className="btn btn-primary">Publish</button>
              <div className="btn-group" role="group">
                <button id="btnGroupDrop1" type="button" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  More
                </button>
                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <li><button type="submit" onClick={() => setStatus('draft')} className="dropdown-item btn btn-warning d-flex align-items-center gap-1"><Icon icon={`bi:bookmark`} />Save as Draft</button></li>
                  <li><button type="submit" onClick={() => setStatus('trash')} className="dropdown-item btn btn-warning d-flex align-items-center gap-1"><Icon icon={`bi:bookmark`} />Move to Trash</button></li>
                </ul>
              </div>
            </div>
            <input type="hidden" name='status' defaultValue={status} />
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
                  ],
                  toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

                }}
                onChange={(e) => setContent(e.target.getContent())}
              />
              <textarea defaultValue={content} name="content" className='d-none'></textarea>
            </div>
          </div>

          <div className="form-group mb-3">
            <Dropzone files={files} setFiles={setFiles} />
          </div>
        </form>
      </div>

      <div id='someuniqueid'>
        <form action="">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, similique aperiam voluptatum error soluta officia aliquid excepturi dicta est quia hic suscipit? Earum eius aperiam ipsam deserunt, distinctio provident quis!
          <Dropzone files={files} setFiles={setFiles} />
        </form>
      </div>
    </div>
  );
}


export default CreateOrUpdate