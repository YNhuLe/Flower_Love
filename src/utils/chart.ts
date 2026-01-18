function calculateKPI(current: number[], previous?: number[]) {
  if (previous) {
    return (((current[current.length - 1] - previous[previous.length - 1]) / previous[previous.length - 1]) * 100).toFixed(2);
  }
  return (((current[current.length - 1] - current[0]) / current[0]) * 100).toFixed(2);
}



function calculateTrend( sale: number[]){
 if(sale){
  return ((sale[sale.length -1] - sale[0]).toFixed(2))
 }
 return "N/A"
}


function formatMonthDay( dateString: string){
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", 

    {
      month: "short",
      day: "numeric"
    }
  )
}
export { calculateTrend, calculateKPI, formatMonthDay };

