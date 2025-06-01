import React from 'react';
import { Newspaper, BarChart3, Lightbulb, Clock, ListChecks, CalendarPlus, CheckCircle } from 'lucide-react'; // 아이콘 추가 (Clock, ListChecks, CalendarPlus, CheckCircle)
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ComparisonTableRow {
  item: string;
  middleSchool: string;
  highSchool: string;
}

interface TimeTableClassRow {
  level: string;
  time: string;
  teacher: string;
}

interface TimeTableData {
  title: string;
  monFriClass: {
    title: string;
    columns: string[];
    rows: TimeTableClassRow[];
  };
  tueThuClass: {
    title: string;
    columns: string[];
    rows: TimeTableClassRow[];
  };
  additionalInfo: string[];
  wednesdayClinic: { // 수요 클리닉 정보 추가
    title: string;
    columns: string[];
    rows: TimeTableClassRow[];
    recommendation: string;
  };
}

interface MiddleSchoolCourseData {
  title: string;
  introduction: string;
  comparisonTable: {
    title: string;
    columns: string[];
    rows: ComparisonTableRow[];
  };
  timeTable?: TimeTableData; // 타입 수정 -> timeTable?: TimeTableData;
}

const MiddleSchoolRegularCourse: React.FC<MiddleSchoolCourseData> = ({
  title,
  introduction,
  comparisonTable,
  timeTable,
}) => {
  return (
    <section id="middle-school-regular" className="py-12 md:py-16 bg-gradient-to-br from-slate-50 to-gray-100 rounded-lg shadow-xl p-6 md:p-10 my-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
          <Newspaper className="w-10 h-10 mr-3 text-gray-700" /> {title}
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <div className="flex items-start text-gray-700 mb-3">
            <Lightbulb className="w-6 h-6 mr-3 mt-1 flex-shrink-0 text-yellow-500" />
            <p className="text-base leading-relaxed">
              {introduction}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center flex items-center justify-center">
            <BarChart3 className="w-7 h-7 mr-2 text-gray-600" /> {comparisonTable.title}
          </h3>
          <div className="overflow-x-auto">
            <Table className="min-w-full border">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  {comparisonTable.columns.map((col, index) => (
                    <TableHead 
                      key={index} 
                      className={`py-3 px-4 font-semibold text-gray-700 text-sm ${index === 0 ? 'w-1/4' : (index === 1 ? 'w-3/8' : 'w-3/8')}`}
                    >
                      {col}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonTable.rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <TableCell className="py-3 px-4 font-medium text-gray-800 text-sm border-r">{row.item}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-700 text-sm border-r">{row.middleSchool}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-700 text-sm">{row.highSchool}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-8 text-center flex items-center justify-center">
            <Clock className="w-8 h-8 mr-3 text-gray-600" /> {timeTable?.title}
          </h3>

          <div className="mb-8">
            <h4 className="text-xl font-medium text-gray-700 mb-4">{timeTable?.monFriClass.title}</h4>
            <div className="overflow-x-auto">
              <Table className="min-w-full border">
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    {timeTable?.monFriClass.columns.map((col, index) => (
                      <TableHead key={index} className="py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wider ${index === 0 ? 'w-1/3' : (index === 1 ? 'w-1/2' : 'w-1/6')}">{col}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeTable?.monFriClass.rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <TableCell className="py-3 px-4 text-sm text-gray-700 border-r">{row.level}</TableCell>
                      <TableCell className="py-3 px-4 text-sm text-gray-700 border-r whitespace-pre-line">{row.time}</TableCell>
                      <TableCell className="py-3 px-4 text-sm text-gray-700">{row.teacher}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xl font-medium text-gray-700 mb-4">{timeTable?.tueThuClass.title}</h4>
            <div className="overflow-x-auto">
              <Table className="min-w-full border">
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    {timeTable?.tueThuClass.columns.map((col, index) => (
                      <TableHead key={index} className="py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wider ${index === 0 ? 'w-1/3' : (index === 1 ? 'w-1/2' : 'w-1/6')}">{col}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeTable?.tueThuClass.rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <TableCell className="py-3 px-4 text-sm text-gray-700 border-r">{row.level}</TableCell>
                      <TableCell className="py-3 px-4 text-sm text-gray-700 border-r whitespace-pre-line">{row.time}</TableCell>
                      <TableCell className="py-3 px-4 text-sm text-gray-700">{row.teacher}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mb-8 pt-6 border-t border-gray-200">
            <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
              <ListChecks className="w-6 h-6 mr-2 text-blue-600" /> 추가 안내
            </h4>
            <ul className="list-none space-y-2 pl-1 text-sm text-gray-600">
              {timeTable?.additionalInfo.map((info, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" /> 
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </div>

          {timeTable?.wednesdayClinic && (
            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-xl font-medium text-gray-700 mb-4 flex items-center">
                <CalendarPlus className="w-7 h-7 mr-2 text-teal-600" /> {timeTable.wednesdayClinic.title}
              </h4>
              <div className="overflow-x-auto mb-4">
                <Table className="min-w-full border">
                  <TableHeader className="bg-teal-50">
                    <TableRow>
                      {timeTable.wednesdayClinic.columns.map((col, index) => (
                        <TableHead key={index} className="py-3 px-4 font-semibold text-teal-700 text-xs uppercase tracking-wider ${index === 0 ? 'w-1/3' : (index === 1 ? 'w-1/2' : 'w-1/6')}">{col}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeTable.wednesdayClinic.rows.map((row, rowIndex) => (
                      <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-teal-50/50'}>
                        <TableCell className="py-3 px-4 text-sm text-gray-700 border-r">{row.level}</TableCell>
                        <TableCell className="py-3 px-4 text-sm text-gray-700 border-r">{row.time}</TableCell>
                        <TableCell className="py-3 px-4 text-sm text-gray-700">{row.teacher}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-sm text-gray-600 bg-teal-50 p-3 rounded-md">
                <span className="font-semibold text-teal-700">추천 대상:</span> {timeTable.wednesdayClinic.recommendation}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MiddleSchoolRegularCourse; 