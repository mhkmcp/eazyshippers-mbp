<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Supplier;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $suppliers = Supplier::all();
        return response()->json($suppliers);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $data = $request->all();
        $validator = \Validator::make($data, [
            'supplierName' =>'required | string',
            'supplierAddress' =>'required',
            'supplierPhone' =>'required',
            'supplierEmail' =>'required',
            'supplierType' =>'required',
            'supplierStatus' =>'required',

        ]);


        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->getMessageBag(),
            ], 404);
        }

        $supplier = new Supplier();
        
        $supplier->supplierName = $request->supplierName;
        $supplier->supplierId =" ";
        $supplier->supplierAddress = $request->supplierAddress;
        $supplier->supplierPhone = $request->supplierPhone;
        $supplier->supplierEmail = $request->supplierEmail;
        $supplier->supplierType = $request->supplierType;
        $supplier->supplierStatus=$request->supplierStatus;
        $supplier->save();
        
        $supplier = Supplier::find($supplier->id);
        $supplier->supplierId ="SN".$supplier->id;
        $supplier->save();


        $supplier = Supplier::find($supplier->id);

        return response()->json([
            'success' => true,
            'message' => 'Supplier created Successfully!',
            'data' => $supplier ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $data = $request->all();
        $validator = \Validator::make($data, [
            'supplierName' =>'required | string',
            'supplierAddress' =>'required',
            'supplierPhone' =>'required',
            'supplierEmail' =>'required',
            'supplierType' =>'required',
            'supplierStatus' =>'required',

        ]);


        $supplier = Supplier::find($id);

    
        $supplier->supplierName = $request->supplierName;
        $supplier->supplierId ="SN".$supplier->id;
        $supplier->supplierAddress = $request->supplierAddress;
        $supplier->supplierPhone = $request->supplierPhone;
        $supplier->supplierEmail = $request->supplierEmail;
        $supplier->supplierType = $request->supplierType;
        $supplier->supplierStatus=$request->supplierStatus;
        $supplier->save();
        
        //$supplier = Supplier::find($supplier->id);
        
       // $supplier->save();


        $supplier = Supplier::find($supplier->id);

        return response()->json([
            'message' => 'Supplier updated Successfully!',
            'data' => $supplier ]);  
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $supplier = Supplier::find($id);

        if(!is_null($supplier)) {
            $delete_status  =   Supplier::where("id", $id)->delete();

            if($delete_status == 1) {
                return response()->json(["success" => true, "message" => "supplier record deleted successfully."]);
            }
            else{
                return response()->json(["status" => "failed", "message" => "failed to delete, please try again"]);
            }
        }
        else {
            return response()->json(["status" => "failed", "message" => "Whoops! no supplier found with this id"]);
        }
    }
}
