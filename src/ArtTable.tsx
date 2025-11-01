import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { Art } from './Types';


interface ApiResponse {
  data: Art[];
  pagination: {
    total_pages: number;
  };
}

const ArtTable: React.FC = () => {
  const [artworks, setArtworks] = useState<Art[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedIds, setSelectedIds] = useState<{ [key: number]: boolean }>({});

  const fetchData = async (pageNum: number) => {
    const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${pageNum}`);
    const json: ApiResponse = await res.json();
    setArtworks(json.data);
    setTotalPages(json.pagination.total_pages);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div className="card">
      <DataTable value={artworks} paginator rows={10}>
        <Column
          header="Select"
          body={(rowData) => (
            <Checkbox
              checked={selectedIds[rowData.id] || false}
              onChange={(e) =>
                setSelectedIds({
                  ...selectedIds,
                  [rowData.id]: e.checked ?? false,
                })
              }
            />
          )}
        />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>
    </div>
  );
};

export default ArtTable;
