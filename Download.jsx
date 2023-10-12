import jsPDF from "jspdf";


function Download() {

    
    const handleDownload = () => {
        // Create a Blob with your data
        const data = 'This is test data';
        const blob = new Blob([data], { type: 'application/octet-stream' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element
        const a = document.createElement('a');
        a.href = url;
        a.download = 'test.txt'; // Set the desired file name

      
        // Trigger a click event on the anchor element
        a.click();

        // Clean up by revoking the URL
        URL.revokeObjectURL(url);
    };


   
    
    return (
        <div>
            <button onClick={handleDownload}>Download</button>
        </div>
    );
}

export default Download;
