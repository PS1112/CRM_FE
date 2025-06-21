import Moment from "react-moment";

  // Styles for table headers and cells
 export const headerStyle = {
    padding: "12px 8px",
    fontSize: "14px",
    fontWeight: "600",
    background: "#f8f9fa"
  };

 export const cellStyle = {
    padding: "12px 8px",
    fontSize: "14px"
  };

 // Define table columns with initial widths for the ResizableTable
 export const tableColumns = [
    { id: "website", label: "Website", initialWidth: 130, align: "left" },
    { id: "name", label: "Name", initialWidth: 150, align: "left" },
    { id: "email", label: "Email", initialWidth: 200, align: "left" },
    { id: "mobile", label: "Mobile", initialWidth: 130, align: "left" },
    { id: "remarks", label: "Remarks", initialWidth: 150, align: "left" },
    { id: "submitDate", label: "SubmitDate", initialWidth: 180, align: "left" },
    { id: "action", label: "Action", initialWidth: 100, align: "center" },
    { id: "exist", label: "Exist", initialWidth: 80, align: "center" },
    { id: "delete", label: "Delete", initialWidth: 80, align: "center" },
    { id: "preferredTime", label: "Preferred Time", initialWidth: 150, align: "left" }
  ];

  // Transform data for the resizable table
  export const formatTableData = (item) => {
    if (!item) return {};
      return {
        id: item.id || item.Mobile || item.email || Math.random().toString(36).substr(2, 9), // <-- Add this line
        website: item.website || "N/A",
        name: item.Name || "N/A",
        email: item.email || "N/A",
        mobile: item.Mobile || "N/A",
        remarks:
          item.Remarks ||
          `${
            item.planType === 0
              ? "Testing"
              : item.planType === 1
              ? "Core"
              : "Academic"
          }`,
        submitDate: (
          <Moment format="DD/MM/YYYY HH:mm A">{item.SubmitDate}</Moment>
        ),
        action: (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#25D366",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              WA
            </div>
          </div>
        ),
        exist: (
          <span
            style={{
              display: "inline-block",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
              lineHeight: "24px",
              border: "1px solid #dee2e6",
            }}
          >
            1
          </span>
        ),
        delete: (
          <span
            style={{
              display: "inline-block",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
              lineHeight: "24px",
              border: "1px solid #dee2e6",
            }}
          >
            0
          </span>
        ),
        preferredTime: item.preferredTime || "3 PM to 5 PM",
      };
  };