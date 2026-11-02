import { Page, View } from "@react-pdf/renderer";
import ReportFooter from "./ReportFooter"
import ReportHeader from "./ReportHeader"
import { PageSize } from '@react-pdf/types'


const TestReportLayout:React.FC<{children : React.JSX.Element, page? : string | number, total? : string | number, pageSize? : PageSize}> = ({children, page, total, pageSize="A4"}) => {

  return (
    <Page
      size={pageSize}
      style={{
        paddingTop: 40, // Space for the header
        paddingBottom: 40, // Space for the footer
        paddingHorizontal: 35, // Side padding for content
      }}
    >
      <ReportHeader />
        <View
            style={{
                marginTop : 20
            }}
        >
            {children}
        </View>
      <ReportFooter page={page} total={total} />
    </Page>
  )
};

export default TestReportLayout
