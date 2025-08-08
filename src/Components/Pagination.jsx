import React from 'react';
import { Pagination as BootstrapPagination, Form, Row, Col, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, ChevronDoubleLeft, ChevronDoubleRight } from 'react-bootstrap-icons';
import './Pagination.css';

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
  showInfo = true,
  maxVisiblePages = 5
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Calculate visible page numbers
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    onItemsPerPageChange(newItemsPerPage);
    // Reset to page 1 when changing items per page
    onPageChange(1);
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="pagination-container">
      {/* Pagination Info and Items Per Page */}
      <Row className="align-items-center mb-3">
        <Col md={6}>
          {showInfo && (
            <div className="pagination-info">
              <span className="text-muted">
                Showing <strong>{startItem}-{endItem}</strong> of <strong>{totalItems}</strong> results
              </span>
            </div>
          )}
        </Col>
        <Col md={6} className="text-md-end">
          {showItemsPerPage && (
            <div className="d-flex align-items-center justify-content-md-end">
              <Form.Label className="me-2 mb-0 text-muted">Show:</Form.Label>
              <Form.Select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                style={{ width: 'auto', display: 'inline-block' }}
                size="sm"
              >
                <option value={6}>6 per page</option>
                <option value={12}>12 per page</option>
                <option value={24}>24 per page</option>
                <option value={48}>48 per page</option>
              </Form.Select>
            </div>
          )}
        </Col>
      </Row>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Row>
          <Col>
            <div className="d-flex justify-content-center">
              <BootstrapPagination className="mb-0">
                {/* First Page */}
                <BootstrapPagination.Item
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  title="First Page"
                >
                  <ChevronDoubleLeft />
                </BootstrapPagination.Item>

                {/* Previous Page */}
                <BootstrapPagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  title="Previous Page"
                >
                  <ChevronLeft className="me-1" />
                  <span className="d-none d-sm-inline">Previous</span>
                </BootstrapPagination.Prev>

                {/* Page Numbers */}
                {visiblePages[0] > 1 && (
                  <>
                    <BootstrapPagination.Item onClick={() => handlePageChange(1)}>
                      1
                    </BootstrapPagination.Item>
                    {visiblePages[0] > 2 && <BootstrapPagination.Ellipsis disabled />}
                  </>
                )}

                {visiblePages.map(page => (
                  <BootstrapPagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </BootstrapPagination.Item>
                ))}

                {visiblePages[visiblePages.length - 1] < totalPages && (
                  <>
                    {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                      <BootstrapPagination.Ellipsis disabled />
                    )}
                    <BootstrapPagination.Item onClick={() => handlePageChange(totalPages)}>
                      {totalPages}
                    </BootstrapPagination.Item>
                  </>
                )}

                {/* Next Page */}
                <BootstrapPagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  title="Next Page"
                >
                  <span className="d-none d-sm-inline">Next</span>
                  <ChevronRight className="ms-1" />
                </BootstrapPagination.Next>

                {/* Last Page */}
                <BootstrapPagination.Item
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  title="Last Page"
                >
                  <ChevronDoubleRight />
                </BootstrapPagination.Item>
              </BootstrapPagination>
            </div>
          </Col>
        </Row>
      )}

      {/* Mobile-friendly Quick Jump */}
      <Row className="mt-3 d-md-none">
        <Col>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="me-2"
            >
              <ChevronLeft />
            </Button>
            <span className="mx-3">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ms-2"
            >
              <ChevronRight />
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Pagination;