export default function LoadingSpinner({ text = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-stone-200 border-t-green-700 rounded-full animate-spin"></div>
      <p className="mt-4 text-stone-500 text-sm">{text}</p>
    </div>
  );
}
