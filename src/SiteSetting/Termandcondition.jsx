import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import { MdDescription } from "react-icons/md";
import { Link } from "react-router-dom";

function Termandcondition() {
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Term-conditions</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="">SS agri</Link>
                      </li>
                      <li className="breadcrumb-item active">
                        term-conditions
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card" id="orderList">
                <div className="card-header border-0">
                  <div className="row align-items-center gy-3">
                    <div className="col-sm">
                      <h5 className="card-title mb-0">Term-conditions</h5>
                    </div>
                    <div className="col-sm-auto">
                      <div className="d-flex gap-1 flex-wrap">
                        <button
                          className="btn btn-soft-danger"
                          id="remove-actions"
                        >
                          <i className="ri-delete-bin-2-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body border border-dashed border-end-0 border-start-0"></div>

                <CKEditor editor={ClassicEditor} data={MdDescription} />
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-info">
            <i className="ri-file-download-line align-bottom me-1"></i>
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default Termandcondition;
