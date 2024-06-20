<?php

namespace App\Http\Controllers;

use App\Models\WayBill;
use Illuminate\Http\Request;
use Response;
use DB;
use App\Models\OrderDetail;


class WayBillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function waybill($id)
    {
        return WayBill::where("OrderId", $id);
    }



    public function multimotion($id)
    {
        $waybill = WayBill::where("ArticelId", $id)->get();
        return Response::json($waybill);

    }

    public function onemotion($id)
    {
        $waybill = WayBill::where("OrderId", $id)->get();
        return Response::json($waybill);

    }



    public function ShipmentSave(Request $request)
    {
        $datas = json_decode($request->getContent());

        foreach ($datas->data as $item) {
            $activeOrder = OrderDetail::find($item->id);
            $shipment = new WayBill();
            $shipment->ArticelId = $datas->ArticelId;
            $shipment->waybillId = $datas->waybillid;
            $shipment->CorpId = $datas->CorpId;
            $shipment->Weight = $item->Weight;
            $shipment->SendEdPiece = $item->Piece;
            $shipment->OrderId = $item->id;
            $shipment->Dimensions = $activeOrder->Dimensions;
            $shipment->Color = $activeOrder->Color;
            $shipment->ProductTypeName = $activeOrder->ProductTypeName;
            $shipment->save();

        }


        return $request->all();
    }
    public function waybillphoto($id)
    {
        return collect(DB::select('select * from waybillphoto where WayBillId = ?', [$id]))->first();
    }


    public function waybillphotosave(Request $request)
    {

        // DB::select('select * from waybillphoto where WayBillId = ?', [$request->WayBillId]);

        $file = $request->file('file');
        $articelId = $request->ArticelId;
        $WayBillId = $request->WayBillId;
        $ext = $file->extension();
        $name = $file->getClientOriginalName();
        $dosyaAdi = "waybill" . time() . '_' . str_replace(" ", "", $name);
        $file->move(public_path('files'), $dosyaAdi);
        $dosyaYolu = 'files/' . $dosyaAdi;
        DB::insert('insert into waybillphoto (WayBillId	, ArticelId,path) values (' . $WayBillId . ', ' . $articelId . ', "' . $dosyaYolu . '")');
        return response()->json(['path' => $dosyaAdi]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(WayBill $wayBill)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WayBill $wayBill)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WayBill $wayBill)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WayBill $wayBill)
    {
        //
    }
}
