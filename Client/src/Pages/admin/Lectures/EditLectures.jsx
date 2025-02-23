import React from 'react';
import { useParams, Link } from "react-router-dom";
import LectureTab from './LectureTab';

const EditLectures = () => {
    const { courseId } = useParams();

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <Link to={`/admin/course/${courseId}/lecture`}>
                        <button className="bg-blue-500 px-3 py-1 rounded-full hover:bg-blue-600">⬅</button>
                    </Link>
                    <h1 className="font-bold text-xl">Update Your Lecture</h1>
                </div>
            </div>
            <LectureTab />
        </div>
    );
};

export default EditLectures;
