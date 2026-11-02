import { Text, View } from "@react-pdf/renderer";

const ReportFooter : React.FC<{page? : string | number, total? : string | number}> = ({page, total}) => {
    return (
        <View
            style={{
                position: "absolute", // Fix it to the bottom
                bottom: 10,
                left: 0,
                right: 0,
                paddingHorizontal: 35, // Match typical page padding
            }}
            fixed // Ensures it appears on every page
        >
            <View
                style={{
                    borderTop: "1px dashed #111", // Dashed line
                    marginBottom: 5, // Space between line and page number
                }}
            />
            <Text
                style={{
                    color: "#666",
                    fontSize: 12,
                    textAlign: "right", // Center the page number
                }}
                render={({totalPages, pageNumber}) => `${page || pageNumber} of ${total || totalPages}`}
            >
            </Text>
        </View>
    );
};

export default ReportFooter