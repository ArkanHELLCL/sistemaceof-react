import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <CircularProgress />
    </div>
  );
}